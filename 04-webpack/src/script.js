import "./style.css";
import * as THREE from "three";
// import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
// import * as dat from "dat.gui";
// import * as CANNON from "cannon-es";

// const gui = new dat.GUI();
const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

const glTFLoader = new GLTFLoader();
const darcoLoader = new DRACOLoader();
darcoLoader.setDecoderPath("/libs/draco/");
glTFLoader.setDRACOLoader(darcoLoader);
glTFLoader.load("/models/hamburge.glb", (model) => {
  model.scene.scale.set(0.3, 0.3, 0.3)
  scene.add(model.scene);
});

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: 0x777777,
  })
);
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

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
camera.position.set(10, 6, 0);
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
  // const elapsedTime = clock.getElapsedTime();
  // const deltaTime = elapsedTime - lastTime;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();
