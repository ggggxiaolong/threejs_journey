import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

// console.log(gsap)
const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);
// mesh.position.set(0.7, -0.6, 1);
scene.add(mesh);

// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

const size = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 4;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(size.width, size.height);

// const clock = new THREE.Clock();
gsap.to(mesh.position, {x: 2, duration: 1, delay: 1});
gsap.to(mesh.position, {x: 1, duration: 1, delay: 2});

function tick() {
  // mesh.rotation.y = clock.getElapsedTime();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();
