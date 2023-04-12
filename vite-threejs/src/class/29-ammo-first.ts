import * as THREE from "three";
import { Size } from "./model";
import { Util } from "./utils";

const size = Size.getInstance();
const scene = new THREE.Scene();
const camera = Util.initCamera(size);
const renderer = Util.initRenderer(size);
const control = Util.initControl(camera, renderer);
const rigidBodyList = new Array<THREE.Mesh>();
const clock = new THREE.Clock();

let physicsUnivers: Ammo.btDiscreteDynamicsWorld;
let tmpTransformation: Ammo.btTransform;

window.Ammo().then(ammoStart);

function ammoStart() {
    //碰撞配置
    const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
    //管理凸凹碰撞的算法
    const dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
    //重叠对缓存
    const overlappingPairCache = new Ammo.btDbvtBroadphase();
    //解决宇宙中物理规则的约束
    const solver = new Ammo.btSequentialImpulseConstraintSolver();
    //离散动力学世界
    physicsUnivers = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
    physicsUnivers.setGravity(new Ammo.btVector3(0, -75, 0));

    tmpTransformation = new Ammo.btTransform();
    init();
    render();

    createCube(40, new THREE.Vector3(15, -30, 15), 0);
    createCube(4, new THREE.Vector3(0, 10, 0), 1);
    createCube(2, new THREE.Vector3(10, 30, 0), 1);
    createCube(4, new THREE.Vector3(10, 20, 10), 1);
    createCube(6, new THREE.Vector3(5, 40, 20), 1);
    createCube(8, new THREE.Vector3(25, 100, 5), 1);
    createCube(8, new THREE.Vector3(20, 60, 25), 1);
    createCube(4, new THREE.Vector3(20, 100, 25), 1);
    createCube(2, new THREE.Vector3(20, 200, 25), 1);
}


function init() {
    camera.position.set(-25, 20, -25);
    camera.lookAt(new THREE.Vector3(0, 6, 0));
    Util.addAxesHelper(scene, 1)
    size.onResize(function () {
        Util.onResize(size, camera, renderer);
    })

    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(-1, 0.9, 0.4);
    scene.add(directionalLight);
}

// size: 大小
// position: 初始位置
// mass: 物理质量
// rot_quaternion: 旋转
function createCube(size: number, position: THREE.Vector3, mass: number, rot_quaternion?: THREE.Vector4) {
    const quaternion = rot_quaternion || new THREE.Vector4(0, 0, 0, 1);
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        new THREE.MeshPhongMaterial({ color: Math.random() * 0xffffff })
    );
    cube.position.copy(position);
    scene.add(cube);

    const transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(position.x, position.y, position.z));
    transform.setRotation(new Ammo.btQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w));
    //运动状态
    const defaultMotionState = new Ammo.btDefaultMotionState(transform);
    const structColShape = new Ammo.btBoxShape(new Ammo.btVector3(size / 2, size / 2, size / 2));
    structColShape.setMargin(0.05);
    //初始惯性
    const localInertia = new Ammo.btVector3(0, 0, 0);
    structColShape.calculateLocalInertia(mass, localInertia);
    let RBody_Info = new Ammo.btRigidBodyConstructionInfo(mass, defaultMotionState, structColShape, localInertia);
    let RBody = new Ammo.btRigidBody(RBody_Info);
    physicsUnivers.addRigidBody(RBody);

    cube.userData.physicsBody = RBody;
    rigidBodyList.push(cube);
}

function updatePhysicsUniverse(deltaTime: number) {
    physicsUnivers.stepSimulation(deltaTime, 10);
    for (let mesh of rigidBodyList) {
        const physicsBody: Ammo.btRigidBody = mesh.userData.physicsBody;
        const motionState = physicsBody.getMotionState();
        if (motionState) {
            motionState.getWorldTransform(tmpTransformation);
            const position = tmpTransformation.getOrigin();
            const quaternion = tmpTransformation.getRotation();
            mesh.position.set(position.x(), position.y(), position.z());
            mesh.quaternion.set(quaternion.x(), quaternion.y(), quaternion.z(), quaternion.w());
        }
    }
}

function render() {
    const deltaTime = clock.getDelta();
    updatePhysicsUniverse(deltaTime);
    renderer.render(scene, camera);
    control.update()
    requestAnimationFrame(render)
}
