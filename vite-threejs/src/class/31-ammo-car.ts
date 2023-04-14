import * as THREE from "three";
import { Size } from "./model";
import { Util } from "./utils";
type Sync = () => void;

const DISABLE_DEACTIVATION = 4;
const size = Size.getInstance();
const scene = new THREE.Scene();
const camera = Util.initCamera(size);
const renderer = Util.initRenderer(size);
const control = Util.initControl(camera, renderer);
const clock = new THREE.Clock();
const ZERO_QUATERNION = new THREE.Quaternion(0, 0, 0, 1);
const materialDynamic = new THREE.MeshPhongMaterial({ color: 0xfca400 });
const materialStatic = new THREE.MeshPhongMaterial({ color: 0x999999 });
const materialInteractive = new THREE.MeshPhongMaterial({ color: 0x990000 });

let physicsWorld: Ammo.btDiscreteDynamicsWorld;
let tmpTransformation: Ammo.btTransform;
const syncList: Array<Sync> = new Array();
const speedElement = document.createElement("div");
let lastSpeed = 0;

interface Action {
    acceleration: boolean;
    braking: boolean;
    left: boolean;
    right: boolean;
    updateState: (keyType: string, state: boolean) => boolean;
}

let action: Action = {
    acceleration: false,
    braking: false,
    left: false,
    right: false,
    updateState: function (keyType: string, state: boolean): boolean {
        switch (keyType) {
            case "KeyW":
                this.acceleration = state;
                return true;
            case "KeyS":
                this.braking = state;
                return true;
            case "KeyA":
                this.left = state;
                return true;
            case "KeyD":
                this.right = state;
                return true;
            default:
                return false;
        }
    },
};

init();
// render();

window.Ammo().then(ammoStart);

function init() {
    camera.position.set(-4.84, 4.39, -35.11);
    camera.lookAt(new THREE.Vector3(0.33, -0.4, 0.85));
    renderer.setClearColor(0xbfd1e5);
    // Util.addAxesHelper(scene, 1);
    size.onResize(function () {
        Util.onResize(size, camera, renderer);
    });

    const infoElement = document.createElement("div");
    infoElement.id = "info";
    infoElement.textContent = "Ammo.js Raycast vehicle demo \nPress W,A,S,D to move.";
    document.body.appendChild(infoElement);
    speedElement.id = "speedometer";
    speedElement.textContent = "0.0 km/h";
    document.body.appendChild(speedElement);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(10, 10, 5);
    scene.add(dirLight);

    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
}

function keyUp(e: KeyboardEvent): any {
    if (action.updateState(e.code, false)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
}

function keyDown(e: KeyboardEvent): any {
    if (action.updateState(e.code, true)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
}

function ammoStart() {
    tmpTransformation = new Ammo.btTransform();
    const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
    const dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
    const broadphase = new Ammo.btDbvtBroadphase();
    const solver = new Ammo.btSequentialImpulseConstraintSolver();
    physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration);
    physicsWorld.setGravity(new Ammo.btVector3(0, -9.82, 0));
    render();

    // 地面
    createBox(new THREE.Vector3(0, -0.5, 0), new THREE.Vector3(75, 1, 75), ZERO_QUATERNION, 0, 2);
    // 坡
    const quat = ZERO_QUATERNION.clone();
    quat.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 10);
    createBox(new THREE.Vector3(0, -1.5, 0), new THREE.Vector3(8, 4, 10), quat, 0);

    //砖墙
    const size = 0.75;
    const nWidth = 8;
    const nHeight = 6;
    for (let j = 0; j < nWidth; j++)
        for (var i = 0; i < nHeight; i++)
            createBox(
                new THREE.Vector3(size * j - (size * (nWidth - 1)) / 2, size * i - 0.5, 10),
                new THREE.Vector3(size, size, size),
                ZERO_QUATERNION,
                10
            );
    createVehicle(new THREE.Vector3(0, 4, -20), ZERO_QUATERNION);
}

// 位置，旋转，大小，质量，摩擦力
function createBox(
    position: THREE.Vector3,
    size: THREE.Vector3,
    quat: THREE.Quaternion,
    mass: number = 0,
    friction: number = 1
) {
    const material = mass > 0 ? materialDynamic : materialStatic;
    const cube = new THREE.Mesh(new THREE.BoxGeometry(size.x, size.y, size.z, 1, 1, 1), material);
    cube.position.copy(position);
    cube.quaternion.copy(quat);
    scene.add(cube);

    const shape = new Ammo.btBoxShape(new Ammo.btVector3(size.x / 2, size.y / 2, size.z / 2));
    shape.setMargin(0.05);
    const transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(position.x, position.y, position.z));
    transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
    // 初始形态
    const motionState = new Ammo.btDefaultMotionState(transform);
    const localInertia = new Ammo.btVector3(0, 0, 0);
    shape.calculateLocalInertia(mass, localInertia);
    const rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia);
    const rbBody = new Ammo.btRigidBody(rbInfo);
    rbBody.setFriction(friction);

    physicsWorld.addRigidBody(rbBody);

    if (mass > 0) {
        rbBody.setActivationState(DISABLE_DEACTIVATION);
        function sync() {
            const ms = rbBody.getMotionState();
            if (ms) {
                ms.getWorldTransform(tmpTransformation);
                const position = tmpTransformation.getOrigin();
                const quaternion = tmpTransformation.getRotation();
                cube.position.set(position.x(), position.y(), position.z());
                cube.quaternion.set(quaternion.x(), quaternion.y(), quaternion.z(), quaternion.w());
            }
        }
        syncList.push(sync);
    }
}

function createWheelMesh(radius: number, width: number): THREE.Mesh {
    const geometry = new THREE.CylinderGeometry(radius, radius, width, 24, 1);
    geometry.rotateZ(Math.PI / 2);
    const wheel = new THREE.Mesh(geometry, materialInteractive);
    wheel.add(
        new THREE.Mesh(new THREE.BoxGeometry(width * 1.5, radius * 1.75, radius * 0.25, 1, 1, 1), materialInteractive)
    );
    scene.add(wheel);
    return wheel;
}

function createChassisMesh(size: THREE.Vector3): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(size.x, size.y, size.z, 1, 1, 1);
    const mesh = new THREE.Mesh(geometry, materialInteractive);
    scene.add(mesh);
    return mesh;
}

function createVehicle(position: THREE.Vector3, quaternion: THREE.Quaternion) {
    const chassisWidth = 1.8;
    const chassisHeight = 0.6;
    const chassisLength = 4;
    const massVehicle = 800;

    const wheelAxisPositionBack = -1;
    const wheelRadiusBack = 0.4;
    const wheelWidthBack = 0.3;
    const wheelHalfTrackBack = 1;
    const wheelAxisHeightBack = 0.3;

    const wheelAxisFrontPosition = 1.7;
    const wheelHalfTrackFront = 1;
    const wheelAxisHeightFront = 0.3;
    const wheelRadiusFront = 0.35;
    const wheelWidthFront = 0.2;

    const friction = 1000;
    const suspensionStiffness = 20.0;
    const suspensionDamping = 2.3;
    const suspensionCompression = 4.4;
    const suspensionRestLength = 0.6;
    const rollInfluence = 0.2;

    const steeringIncrement = 0.04;
    const steeringClamp = 0.5;
    const maxEngineForce = 2000;
    const maxBreakingForce = 100;

    // 机壳
    const shape = new Ammo.btBoxShape(new Ammo.btVector3(chassisWidth / 2, chassisHeight / 2, chassisLength / 2));
    const transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(position.x, position.y, position.z));
    transform.setRotation(new Ammo.btQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w));
    const motionState = new Ammo.btDefaultMotionState(transform);
    const localInertia = new Ammo.btVector3(0, 0, 0);
    shape.calculateLocalInertia(massVehicle, localInertia);
    const rbBody = new Ammo.btRigidBody(
        new Ammo.btRigidBodyConstructionInfo(massVehicle, motionState, shape, localInertia)
    );
    rbBody.setActivationState(DISABLE_DEACTIVATION);
    physicsWorld.addRigidBody(rbBody);
    const chassisMesh = createChassisMesh(new THREE.Vector3(chassisWidth, chassisHeight, chassisLength));

    // const engineForce = 0;
    let vehicleSteering = 0;
    // const breakingForce = 0;
    const tuning = new Ammo.btVehicleTuning();
    const rayCaster = new Ammo.btDefaultVehicleRaycaster(physicsWorld);
    const vehicle = new Ammo.btRaycastVehicle(tuning, rbBody, rayCaster);
    vehicle.setCoordinateSystem(0, 1, 2);
    physicsWorld.addAction(vehicle);

    //车轮
    const FRONT_LEFT = 0;
    const FRONT_RIGHT = 1;
    const BACK_LEFT = 2;
    const BACK_RIGHT = 3;
    const wheelMesh: Array<THREE.Mesh> = [];
    const wheelDirectionCS0 = new Ammo.btVector3(0, -1, 0);
    const wheelAxleCS = new Ammo.btVector3(-1, 0, 0);

    function createWheel(isFront: boolean, position: Ammo.btVector3, radius: number, width: number, index: number) {
        const wheelInfo = vehicle.addWheel(
            position,
            wheelDirectionCS0,
            wheelAxleCS,
            suspensionRestLength,
            radius,
            tuning,
            isFront
        );
        wheelInfo.set_m_suspensionStiffness(suspensionStiffness);
        wheelInfo.set_m_wheelsDampingRelaxation(suspensionDamping);
        wheelInfo.set_m_wheelsDampingCompression(suspensionCompression);
        wheelInfo.set_m_frictionSlip(friction);
        wheelInfo.set_m_rollInfluence(rollInfluence);

        wheelMesh[index] = createWheelMesh(radius, width);
    }

    createWheel(
        true,
        new Ammo.btVector3(wheelHalfTrackFront, wheelAxisHeightFront, wheelAxisFrontPosition),
        wheelRadiusFront,
        wheelWidthFront,
        FRONT_LEFT
    );
    createWheel(
        true,
        new Ammo.btVector3(-wheelHalfTrackFront, wheelAxisHeightFront, wheelAxisFrontPosition),
        wheelRadiusFront,
        wheelWidthFront,
        FRONT_RIGHT
    );
    createWheel(
        false,
        new Ammo.btVector3(-wheelHalfTrackBack, wheelAxisHeightBack, wheelAxisPositionBack),
        wheelRadiusBack,
        wheelWidthBack,
        BACK_LEFT
    );
    createWheel(
        false,
        new Ammo.btVector3(wheelHalfTrackBack, wheelAxisHeightBack, wheelAxisPositionBack),
        wheelRadiusBack,
        wheelWidthBack,
        BACK_RIGHT
    );

    function sync() {
        const speed = vehicle.getCurrentSpeedKmHour();
        if (speed != lastSpeed) {
            speedElement.innerHTML = (speed < 0 ? "(R) " : "") + Math.abs(speed).toFixed(1) + "km/h";
        }
        let breakingForce = 0;
        let engineForce = 0;
        if (action.acceleration) {
            if (speed < -1) {
                breakingForce = maxBreakingForce;
            } else {
                engineForce = maxEngineForce;
            }
        }
        if (action.braking) {
            if (speed > 1) {
                breakingForce = maxBreakingForce;
            } else {
                engineForce = -maxEngineForce / 2;
            }
        }
        if (action.left) {
            if (vehicleSteering < steeringClamp) vehicleSteering += steeringIncrement;
        } else {
            if (action.right) {
                if (vehicleSteering > -steeringClamp) vehicleSteering -= steeringIncrement;
            } else {
                if (vehicleSteering < -steeringIncrement) vehicleSteering += steeringIncrement;
                else {
                    if (vehicleSteering > steeringIncrement) vehicleSteering -= steeringIncrement;
                    else {
                        vehicleSteering = 0;
                    }
                }
            }
        }

        vehicle.applyEngineForce(engineForce, BACK_LEFT);
        vehicle.applyEngineForce(engineForce, BACK_RIGHT);

        vehicle.setBrake(breakingForce / 2, FRONT_LEFT);
        vehicle.setBrake(breakingForce / 2, FRONT_RIGHT);
        vehicle.setBrake(breakingForce, BACK_LEFT);
        vehicle.setBrake(breakingForce, BACK_RIGHT);

        vehicle.setSteeringValue(vehicleSteering, FRONT_LEFT);
        vehicle.setSteeringValue(vehicleSteering, FRONT_RIGHT);

        const wheelCount = vehicle.getNumWheels();
        for (let i = 0; i < wheelCount; i++) {
            vehicle.updateWheelTransform(i, true);
            const tm = vehicle.getWheelTransformWS(i);
            const position = tm.getOrigin();
            const quaternion = tm.getRotation();
            wheelMesh[i].position.set(position.x(), position.y(), position.z());
            wheelMesh[i].quaternion.set(quaternion.x(), quaternion.y(), quaternion.z(), quaternion.w());
        }

        const tm = vehicle.getChassisWorldTransform();
        const position = tm.getOrigin();
        const quaternion = tm.getRotation();
        chassisMesh.position.set(position.x(), position.y(), position.z());
        chassisMesh.quaternion.set(quaternion.x(), quaternion.y(), quaternion.z(), quaternion.w());
    }
    syncList.push(sync);
}

function render() {
    renderer.render(scene, camera);
    const dt = clock.getDelta();
    control.update();
    physicsWorld.stepSimulation(dt, 10);
    syncList.forEach((fn) => fn());
    requestAnimationFrame(render);
}
