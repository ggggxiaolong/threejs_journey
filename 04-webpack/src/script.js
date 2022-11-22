import "./style.css";
import * as THREE from "three";
// import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import * as dat from "dat.gui";

// console.log(gsap)
// const gui = new dat.GUI();

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);

// load manger
const loadManager = new THREE.LoadingManager();
// loadManager.onStart = function () {
//   console.log("onStart");
// };
// loadManager.onLoad = function () {
//   console.log("OnLoad");
// };
// loadManager.onProgress = function (url, itemsLoaded, itemsTotal) {
//   console.log(
//     "Loading file: " +
//       url +
//       ".\nLoaded " +
//       itemsLoaded +
//       " of " +
//       itemsTotal +
//       " files."
//   );
// };

// loadManager.onError = function (url) {
//   console.log("error loading " + url);
// };

const loader = new THREE.TextureLoader(loadManager);
// const texture = loader.load("/textures/door/color.jpg");
// const texture = loader.load("/textures/checkerboard-8x8.png");
const texture = loader.load("/textures/minecraft.png");
// repeat wrap rotation

// texture.repeat.x = 2
// texture.repeat.y = 3
// texture.wrapS = THREE.MirroredRepeatWrapping
// texture.wrapT = THREE.MirroredRepeatWrapping

// texture.offset.x = 0.5
// texture.offset.y = 0.5

// texture.rotation = Math.PI * 0.25
// texture.center.x = 0.5
// texture.center.y = 0.5

// mipmapping 当nimFilter使用NearestFilter时关闭generateMipmaps可以提高性能
texture.generateMipmaps = false
texture.minFilter = THREE.NearestFilter


texture.magFilter = THREE.NearestFilter

const material = new THREE.MeshBasicMaterial({ map: texture });
const mesh = new THREE.Mesh(geometry, material);
// mesh.position.set(0.7, -0.6, 1);
scene.add(mesh);

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

camera.position.z = 3;
// camera.position.x = 2;
// camera.position.y = 2;
camera.lookAt(mesh.position);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(size.width, size.height);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

function tick() {
  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();
