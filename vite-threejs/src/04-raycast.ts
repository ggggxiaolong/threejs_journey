import * as THREE from "three";
import { Size } from "./model";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { AxesHelper } from "three";

let scene: THREE.Scene;
let camer: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let light: THREE.HemisphereLight;
let control: OrbitControls;
const size = Size.getInstance();
let mesh: THREE.InstancedMesh;
// let axiesHelper: AxesHelper;
let mouse: THREE.Vector2;
let raycaste: THREE.Raycaster;
const amount = 10;
const count = Math.pow(10, 3);
const white = new THREE.Color(0xffffff);
const tempColor = new THREE.Color();
let coloredCount = 0;
let counterElement: Element | null;

init();
addMesh();
render();

function init() {
  counterElement = document.querySelector("div.count");
  mouse = new THREE.Vector2(1, 1);
  raycaste = new THREE.Raycaster();
  scene = new THREE.Scene();
  camer = new THREE.PerspectiveCamera(30, size.aspect, 0.1, 1000);
  camer.position.set(20, 20, 20);
  scene.add(camer);
  //   axiesHelper = new AxesHelper(2);
  //   scene.add(axiesHelper);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(size.pixelRatio);
  document.body.appendChild(renderer.domElement);
  control = new OrbitControls(camer, renderer.domElement);

  light = new THREE.HemisphereLight(0xffffff, 0x888888);
  light.position.set(0, 1, 0);
  scene.add(light);
}

function addMesh() {
  const radius = 0.5;
  const geometry = new THREE.IcosahedronGeometry(radius, 3);
  const material = new THREE.MeshPhongMaterial();
  mesh = new THREE.InstancedMesh(geometry, material, count);
  const matrix = new THREE.Matrix4();
  const offsite = (amount - radius * 2) / 2;
  let index = 0;
  for (let i = 0; i < amount; i++) {
    for (let j = 0; j < amount; j++) {
      for (let k = 0; k < amount; k++) {
        matrix.setPosition(i - offsite, j - offsite, k - offsite);
        mesh.setMatrixAt(index, matrix);
        mesh.setColorAt(index, white);
        index += 1;
      }
    }
  }
  scene.add(mesh);
}

function render() {
  renderer.render(scene, camer);
  raycaste.setFromCamera(mouse, camer);
  let objects = raycaste.intersectObject(mesh);
  if (objects.length > 0) {
    const instanceId = objects[0].instanceId!!;
    mesh.getColorAt(instanceId, tempColor);
    if (tempColor.equals(white)) {
      mesh.setColorAt(instanceId, tempColor.setHex(Math.random() * 0xffffff));
      mesh.instanceColor!!.needsUpdate = true;
      coloredCount += 1;
      counterElement!!.innerHTML = `${coloredCount} / ${count}`;
    }
  }

  requestAnimationFrame(render);
}

size.onResise(function () {
  camer.aspect = size.aspect;
  camer.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
});
window.addEventListener("mousemove", function (e) {
  mouse.x = (e.clientX / size.width) * 2 - 1;
  mouse.y = 1 - (e.clientY / size.height) * 2;
});
