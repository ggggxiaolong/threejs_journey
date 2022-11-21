import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

// console.log(gsap)
const gui = new dat.GUI();

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);

const parameters = {
  color: "#ff0000",
  spin: function () {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
  },
};
const material = new THREE.MeshBasicMaterial({color: parameters.color});
const mesh = new THREE.Mesh(geometry, material);
// mesh.position.set(0.7, -0.6, 1);
scene.add(mesh);

/**
 * debug
 */
gui.add(mesh.position, "y", -3, 3, 0.01).name("elevation");
gui.add(mesh, "visible");
gui.add(material, "wireframe");
gui.add(parameters, "spin")
gui.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
});

// const axesHelper = new THREE.AxesHelper();
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

// window.addEventListener("dblclick", () => {
//   if (!document.fullscreenElement) {
//     canvas.requestFullscreen();
//   } else {
//     document.exitFullscreen();
//   }

//   if (document.webkitFullscreenElement) {
//     canvas.webkitRequestFullscreen();
//   } else {
//     document.webkitExitFullscreen();
//   }
// });

// const aspectRatio = size.width / size.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)

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

// const clock = new THREE.Clock();
// gsap.to(mesh.position, {x: 2, duration: 1, delay: 1});
// gsap.to(mesh.position, {x: 1, duration: 1, delay: 2});

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

function tick() {
  // mesh.rotation.y = clock.getElapsedTime();
  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();
