import "./style.css";
import * as THREE from "three";
// import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import * as dat from "dat.gui";

// const gui = new dat.GUI();
const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

const loader = new THREE.TextureLoader();

// cube
// const geometry = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10)
// const material = new THREE.PointsMaterial({size: 0.01})
// const mesh = new THREE.Points(geometry, material)
// scene.add(mesh)

// attribute position
const count = 2000;
const points = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) {
  points[i] = THREE.MathUtils.randFloatSpread(10);
  colors[i] = Math.random();
}
// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
// const material = new THREE.PointsMaterial({ size: 0.1, color: "#FB7299" });
// const cubePoints = new THREE.Points(geometry, material);
// scene.add(cubePoints);

// texture
const heartTexture = loader.load("/textures/particle/symbol_01.png");
const circleTexture = loader.load("/textures/particle/circle_01.png");
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
const material = new THREE.PointsMaterial({
  size: 0.1,
  // color: "#FB7299",
  alphaMap: circleTexture,
  transparent: true,
  // alphaTest: 0.01,
  // depthTest: false
  depthWrite: false,
  // blending: THREE.AdditiveBlending,
  vertexColors: true,
});
const cubePoints = new THREE.Points(geometry, material);
scene.add(cubePoints);
// alphaTest
// depthTest
// const cube2 = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial())
// scene.add(cube2)
// blending
// attribute color

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

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 7;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(size.width, size.height);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0x262837);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const clock = new THREE.Clock();

function tick() {
  const elapsedTime = clock.getElapsedTime();
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const x = geometry.attributes.position.array[i3];
    geometry.attributes.position.array[i3+1] = Math.sin(x + elapsedTime)
  }
  geometry.attributes.position.needsUpdate = true
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();
