import "./style.css";
import * as THREE from "three";
// import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import * as dat from "dat.gui";

// const gui = new dat.GUI();
const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

// const material =
const geometry = new THREE.SphereGeometry(0.5, 16, 16);
const sphere1 = new THREE.Mesh(
  geometry,
  new THREE.MeshBasicMaterial({ color: "#FB7299" })
);
scene.add(sphere1);
const sphere2 = new THREE.Mesh(
  geometry,
  new THREE.MeshBasicMaterial({ color: "#FB7299" })
);
sphere2.position.x = -2;
scene.add(sphere2);
const sphere3 = new THREE.Mesh(
  geometry,
  new THREE.MeshBasicMaterial({ color: "#FB7299" })
);
sphere3.position.x = 2;
scene.add(sphere3);

// const rayOrigin = new THREE.Vector3(-3, 0, 0);
// const direction = new THREE.Vector3(10, 0, 0);
// direction.normalize();
// const raycaster = new THREE.Raycaster(rayOrigin, direction);
let focusSphere = null;
let oldFocusSphere = null;
const mouse = new THREE.Vector2();

const raycaster = new THREE.Raycaster();
const spheres = [sphere1, sphere2, sphere3];

const intersectObjects = raycaster.intersectObjects(spheres);
console.log(intersectObjects.length);

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / size.width) * 2 - 1;
  mouse.y = (event.clientY / size.height) * -2 + 1;
  // console.log(`X: ${mouse.x}, Y: ${mouse.y}`)
});

window.addEventListener("click", () => {
  for (const sphere of spheres) {
    if (focusSphere.object === sphere) {
      sphere.material.color.set("#00AEEC");
    } else {
      sphere.material.color.set("#FB7299");
    }
  }
});

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

camera.position.set(0, 0, 5);
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
  sphere1.position.y = Math.sin(elapsedTime * 0.3);
  sphere2.position.y = Math.sin(elapsedTime * 0.8);
  sphere3.position.y = Math.sin(elapsedTime * 1.3);
  raycaster.setFromCamera(mouse, camera);
  const intersectObjects = raycaster.intersectObjects(spheres);
  // for (const sphere of spheres) {
  //   sphere.material.color.set("#FB7299");
  // }

  // for (const obj of intersectObjects) {
  //   obj.object.material.color.set("#00AEEC");
  // }
  if (intersectObjects.length != 0 && focusSphere == null) {
    focusSphere = intersectObjects[0];
  }
  if (intersectObjects.length == 0 && focusSphere != null) {
    oldFocusSphere = focusSphere;
    focusSphere = null;
  }

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();
