import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ShadowMapViewer } from "three/examples/jsm/utils/ShadowMapViewer";
import { Size } from "./model";

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
const size = Size.getInstance();
let controler: OrbitControls;
let dirLight: THREE.DirectionalLight;
let spotLight: THREE.SpotLight;
let torusKnot: THREE.Mesh;
let cube: THREE.Mesh;
let floort: THREE.Mesh;
let gui: GUI;
const clock = new THREE.Clock();
let dirLightShadow: ShadowMapViewer;
let spotLightShadow: ShadowMapViewer;

init();
addMesh();
addLight();
addShadow();
render();

function init() {
  gui = new GUI();
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x333333);
  camera = new THREE.PerspectiveCamera(60, size.aspect, 0.1, 100);
  camera.position.set(10, 40, 50);
  scene.add(camera);
  //   const axiesHelper = new THREE.AxesHelper(10);
  //   scene.add(axiesHelper);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(size.pixelRatio);
  document.body.appendChild(renderer.domElement);

  controler = new OrbitControls(camera, renderer.domElement);
  controler.target.set(0, 1, 0);
}

function addMesh() {
  let material = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    shininess: 150,
    specular: 0xcccccc,
  });
  torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(20, 5, 75, 10),
    material
  );
  torusKnot.scale.multiplyScalar(1 / 7);
  torusKnot.position.set(5, 7, -10);

  cube = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), material);

  cube.position.set(5, 7, 20);

  floort = new THREE.Mesh(
    new THREE.PlaneGeometry(70, 70),
    new THREE.MeshStandardMaterial({ color: 0xcccccc })
  );
  floort.rotation.x = -Math.PI / 2;
  scene.add(floort, torusKnot, cube);
}

function addLight() {
  const ambientLignt = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLignt);

  dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(0, 20, 0);
  dirLight.name = "Dir Light"
  scene.add(dirLight);

  spotLight = new THREE.SpotLight(0xffffff, 0.7, 500, Math.PI / 9, 0.1);
  spotLight.position.set(51, 27, -10);
  spotLight.target = torusKnot;
  spotLight.name = "Spot Light"
  scene.add(spotLight);

  gui.add(spotLight.position, "x", -10, 100);
  gui.add(spotLight.position, "y", -10, 100);
  gui.add(spotLight.position, "z", -10, 100);
  dirLightShadow = new ShadowMapViewer(dirLight);
  spotLightShadow = new ShadowMapViewer(spotLight);
  updateShadowSize();
}

function updateShadowSize() {
  const shadowWidth = size.width * 0.17;
  const shadowHeight = size.height * 0.17;
  dirLightShadow.position.set(10, 10);
  dirLightShadow.size.set(shadowWidth, shadowHeight);

  spotLightShadow.position.set(shadowWidth + 20, 10);
  spotLightShadow.size.set(shadowWidth, shadowHeight);
}

function addShadow() {
  renderer.shadowMap.enabled = true;
  spotLight.castShadow = true;
  dirLight.castShadow = true;
  floort.receiveShadow = true;
  torusKnot.castShadow = true;
  cube.castShadow = true;
  dirLight.shadow.camera.far = 21;
  dirLight.shadow.camera.left = 16;
  dirLight.shadow.camera.right = -16;
  dirLight.shadow.camera.top = 28;
  dirLight.shadow.camera.bottom = -28;
  const dirLightHelper = new THREE.CameraHelper(dirLight.shadow.camera);
  scene.add(dirLightHelper);
  spotLight.shadow.camera.near = 40;
  spotLight.shadow.camera.far = 94;
  const spotLightHelper = new THREE.CameraHelper(spotLight.shadow.camera);
  scene.add(spotLightHelper);
}

function render() {
  controler.update();
  renderer.render(scene, camera);
  const delta = clock.getDelta();
  torusKnot.rotation.x += delta * 0.5;
  torusKnot.rotation.y += delta * 2;
  torusKnot.rotation.z += delta * 0.5;

  cube.rotation.x += delta * 0.5;
  cube.rotation.y += delta * 2;
  cube.rotation.z += delta * 0.5;

  dirLightShadow.render(renderer);
  spotLightShadow.render(renderer);

  requestAnimationFrame(render);
}

size.onResize(function () {
  camera.aspect = size.aspect;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
  updateShadowSize();
  dirLightShadow.updateForWindowResize();
  spotLightShadow.updateForWindowResize();
});
