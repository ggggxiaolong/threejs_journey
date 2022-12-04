import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import * as CANNON from "cannon-es";

const gui = new dat.GUI();
const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

/**
 * Physic world
 */

const defaultMaterial = new CANNON.Material("default");

const defaultContactMaterial = new CANNON.ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  {
    friction: 0.1,
    restitution: 0.7,
  }
);
const world = new CANNON.World({
  allowSleep: true,
  gravity: new CANNON.Vec3(0, -9.82, 0),
  defaultMaterial: defaultMaterial,
  defaultContactMaterial: defaultContactMaterial,
});
// physicWorld.broadphase = new CANNON.SAPBroadphase(physicWorld)
// physicWorld.addContactMaterial(defaultContactMaterial);
world.defaultContactMaterial = defaultContactMaterial;

const sphereShape = new CANNON.Sphere(0.5);
const sphearBody = new CANNON.Body({
  mass: 1,
  position: new CANNON.Vec3(0, 4, 0),
  shape: sphereShape,
});
sphearBody.addEventListener("collide", playSound);
// sphearBody.applyLocalForce(
//   new CANNON.Vec3(50, 0, 0),
//   new CANNON.Vec3(0, 0, 0)
// );
world.addBody(sphearBody);

const planeShape = new CANNON.Plane();
const planeBody = new CANNON.Body({
  mass: 0,
  shape: planeShape,
});
planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5);
world.addBody(planeBody);
// console.log(planeBody.position);

const params = {};
// const loader = new THREE.TextureLoader();

const hitSound = new Audio("/sounds/hit.mp3");

function playSound(collision) {
  const strength = collision.contact.getImpactVelocityAlongNormal();
  if (strength > 1.5) {
    hitSound.volume = Math.random();
    hitSound.currentTime = 0;
    hitSound.play();
  }
}

const mesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshStandardMaterial()
);
mesh.position.y = 4;
mesh.castShadow = true;
scene.add(mesh);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: "#777777",
  })
);
floor.rotation.x = -Math.PI * 0.5;
floor.receiveShadow = true;
scene.add(floor);

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial();

const addedObjects = [{ mesh: mesh, body: sphearBody }];

function addSphere(radius, position) {
  const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  mesh.position.copy(position);
  mesh.scale.set(radius, radius, radius);
  mesh.castShadow = true;
  scene.add(mesh);

  const body = new CANNON.Body({
    shape: new CANNON.Sphere(radius),
    position: new CANNON.Vec3(0, 4, 0),
    mass: 1,
  });
  body.position.copy(position);
  body.addEventListener("collide", playSound);
  world.addBody(body);

  addedObjects.push({ mesh: mesh, body });
}

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

function addBox(width, height, depth, position) {
  const mesh = new THREE.Mesh(boxGeometry, sphereMaterial);
  mesh.castShadow = true;
  mesh.scale.set(width, height, depth);
  mesh.position.copy(position);
  scene.add(mesh);

  const shape = new CANNON.Box(
    new CANNON.Vec3(width / 2, height / 2, depth / 2)
  );
  const body = new CANNON.Body({
    mass: 1,
    shape: shape,
    position: new CANNON.Vec3(0, 4, 0),
  });
  body.position.copy(position);
  body.addEventListener("collide", playSound);
  world.addBody(body);

  addedObjects.push({ mesh: mesh, body: body });
}

params.addBox = function () {
  addBox(Math.random(), Math.random(), Math.random(), {
    x: THREE.MathUtils.randFloatSpread(4),
    y: 4,
    z: THREE.MathUtils.randFloatSpread(3),
  });
};
params.addSphere = function () {
  addSphere(Math.random(), {
    x: THREE.MathUtils.randFloatSpread(4),
    y: 4,
    z: THREE.MathUtils.randFloatSpread(3),
  });
};
params.reset = function () {
  for (const obj of addedObjects) {
    obj.body.removeEventListener("collide", playSound);
    world.removeBody(obj.body);
    scene.remove(obj.mesh);
  }
};

gui.add(params, "addBox");
gui.add(params, "addSphere");
gui.add(params, "reset");

//light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 0.2);
light.position.set(5, 2, 0);
light.castShadow = true;
light.shadow.camera.far = 10;
scene.add(light);

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
});

const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100
);
camera.position.set(0, 6, 9);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(size.width, size.height);
renderer.shadowMap.enabled = true;
// renderer.setClearAlpha(0)

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const clock = new THREE.Clock();
let lastTime = 0;

function tick() {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - lastTime;
  lastTime = elapsedTime;
  world.step(1 / 60, deltaTime, 3);
  mesh.position.copy(sphearBody.position);
  for (const obj of addedObjects) {
    obj.mesh.position.copy(obj.body.position);
    obj.mesh.quaternion.copy(obj.body.quaternion);
  }

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();
