import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Size } from "./model";
import { GUI } from "lil-gui";

let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let size: Size;
let spotLight: THREE.SpotLight;
let cylinder: THREE.Mesh;
let floor: THREE.Mesh;
let control: OrbitControls;
let gui: GUI;

init();
addMesh();
initLight();
initShadow();
render();

function init() {
  gui = new GUI();
  size = new Size();
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(size.pixelRatio);
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(40, size.aspect, 0.1, 1000);
  camera.position.set(-20, 120, 200);
  camera.lookAt(0, 0, 0);
  scene.add(camera);

  const axiesHelper = new THREE.AxesHelper(20);
  scene.add(axiesHelper);

  control = new OrbitControls(camera, renderer.domElement);
  // control.addEventListener("change", render);
}

function addMesh() {
  const floorGeomotry = new THREE.PlaneGeometry(260, 220);
  const floorMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc });
  floor = new THREE.Mesh(floorGeomotry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const cylinderGeometry = new THREE.CylinderGeometry(5, 5, 2, 24, 1, false);
  const cylinderMaterial = new THREE.MeshPhongMaterial({ color: 0x4080ff });
  cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  cylinder.position.set(0, 10, 0);
  scene.add(cylinder);
}

function initLight() {
  const abmientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(abmientLight);

  spotLight = new THREE.SpotLight(0xffffff, 1, 500, Math.PI / 6, 0.1);
  spotLight.position.set(-50, 80, 0);
  scene.add(spotLight);

  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLightHelper);

  const lightFolder = gui.addFolder("spot light");
  lightFolder.addColor(spotLight, "color");
  lightFolder.add(spotLight, "intensity", 0, 1)
  lightFolder.add(spotLight, "angle", 0, Math.PI/2).onChange(function(){
    spotLightHelper.update()
  })
  lightFolder.add(spotLight, "penumbra", 0, 1);
  const cameraFolder = gui.addFolder('camera');
  cameraFolder.add(camera.position, "x", -1000, 1000);
  cameraFolder.add(camera.position, "y", -1000, 1000);
  cameraFolder.add(camera.position, "z", -1000, 1000);
}

function initShadow() {
  renderer.shadowMap.enabled = true;
  spotLight.castShadow = true;
  cylinder.castShadow = true;
  floor.receiveShadow = true;
}

function render() {
  renderer.render(scene, camera);
  control.update();
  requestAnimationFrame(render);
}

window.addEventListener("resize", function () {
  size.onResize();
  camera.aspect = size.aspect;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
});
