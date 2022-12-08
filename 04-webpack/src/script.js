import "./style.css";
import * as THREE from "three";
// import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import * as dat from "dat.gui";
// import * as CANNON from "cannon-es";

const gui = new dat.GUI();
const params = {};
const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

const cubeLoader = new THREE.CubeTextureLoader();
const glTFLoader = new GLTFLoader();
const darcoLoader = new DRACOLoader();
darcoLoader.setDecoderPath("/libs/draco/");
glTFLoader.setDRACOLoader(darcoLoader);
glTFLoader.load("/models/hamburge.glb", (model) => {
  model.scene.scale.set(0.2, 0.2, 0.2);
  model.scene.position.y = -0.5;
  model.scene.rotation.y = -Math.PI * 0.1;
  scene.add(model.scene);
  gui.add(model.scene.rotation, "y", -Math.PI, Math.PI).name("modelY");
  updateMaterial();
});

const envTexture = cubeLoader
  .setPath("/textures/environmentMaps/0/")
  .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);

scene.background = envTexture;
scene.environment = envTexture;
params.envMapIntensity = 2;

function updateMaterial() {
  scene.traverse((child) => {
    if (
      child instanceof THREE.Mesh &&
      child.material instanceof THREE.MeshStandardMaterial
    ) {
      // child.material.envMap = envTexture;
      child.material.envMapIntensity = params.envMapIntensity;
      // child.material.needsUpdate = true
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
}
gui.add(params, "envMapIntensity", 0, 10, 0.1).onChange(updateMaterial);

params.mapSize = 1024

const light = new THREE.DirectionalLight(0xffffff, 4);
light.position.set(3, 2.6, 0);
light.castShadow = true;
light.shadow.mapSize.set(params.mapSize, params.mapSize)
light.shadow.normalBias = 0.05
light.shadow.camera.far = 5;
light.shadow.camera.near = 1;
light.shadow.camera.top = 2;
light.shadow.camera.bottom = -2;
light.shadow.camera.left = 2;
light.shadow.camera.right = -2;
scene.add(light);

// const camreHelper = new THREE.CameraHelper(light.shadow.camera)
// scene.add(camreHelper)

gui.add(light, "intensity", 0, 10);
gui.add(light.position, "x", -10, 10).name("LightX");
gui.add(light.position, "y", -10, 10).name("LightY");
gui.add(light.position, "z", -10, 10).name("LightZ");

// const mesh = new THREE.Mesh(
//   new THREE.SphereGeometry(0.5, 32, 32),
//   new THREE.MeshStandardMaterial()
// );
// scene.add(mesh);

// const axesHelper = new THREE.AxesHelper();
// axesHelper.position.set(-2, 2, 0);
// scene.add(axesHelper);
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
camera.position.set(-0.5, 1.4, 5);
gui.add(camera.position, "x", -5, 5, 0.1).name("cameraX");
gui.add(camera.position, "y", -5, 5, 0.1).name("cameraY");
gui.add(camera.position, "z", -5, 5, 0.1).name("cameraZ");
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(size.width, size.height);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMappingExposure = 1;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

params.toneMapping = 4
gui.add(renderer, "toneMappingExposure", 0, 10, 0.1);
gui.add(params, "toneMapping", {
  No: THREE.NoToneMapping,
  Linear: THREE.LinearToneMapping,
  Reinhard: THREE.ReinhardToneMapping,
  Cineon: THREE.CineonToneMapping,
  ACESFilmic: THREE.ACESFilmicToneMapping,
}).onChange((v) => {
 switch(Number(params.toneMapping)){
  case 0: renderer.toneMapping = THREE.NoToneMapping;  break;
  case 1: renderer.toneMapping = THREE.LinearToneMapping; break;
  case 2: renderer.toneMapping = THREE.ReinhardToneMapping; break;
  case 3: renderer.toneMapping = THREE.CineonToneMapping; break;
  case 4: renderer.toneMapping = THREE.ACESFilmicToneMapping; break;
 }
});
// renderer.setClearAlpha(0)

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// const clock = new THREE.Clock();
// let lastTime = 0;

function tick() {
  // const elapsedTime = clock.getElapsedTime();
  // const deltaTime = elapsedTime - lastTime;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();
