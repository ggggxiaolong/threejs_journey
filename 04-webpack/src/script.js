import "./style.css";
import * as THREE from "three";

const canvas = document.querySelector(".webgl");
// console.log(canvas)
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0.7, -0.6, 1);
scene.add(mesh);

mesh.scale.set(2, 0.5, 0.5)

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

const size = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(size.width, size.height);

renderer.render(scene, camera);
