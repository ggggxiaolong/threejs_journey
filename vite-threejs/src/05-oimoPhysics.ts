import * as THREE from "three";
import { Size } from "./model";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OimoPhysics, OimoPhysicsMete } from "three/examples/jsm/physics/OimoPhysics";

const size = Size.getInstance();
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let control: OrbitControls;
let renderer: THREE.WebGLRenderer;
// let axiesHelper: THREE.AxesHelper;
let boxes: THREE.InstancedMesh;
let spheres: THREE.InstancedMesh;
let light: THREE.DirectionalLight;
let floor: THREE.Mesh;
let phiscis:OimoPhysicsMete;
const position = new THREE.Vector3();

init();
addMesh();
addLight();
addShadow();
await addPhysics();
render();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x888888);
  camera = new THREE.PerspectiveCamera(50, size.aspect, 0.1, 100);
  camera.position.set(4, 4, 4);
  scene.add(camera);

  // axiesHelper = new THREE.AxesHelper(1);
  //   scene.add(axiesHelper);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(size.pixelRatio);
  renderer.outputEncoding = THREE.sRGBEncoding;
  document.body.appendChild(renderer.domElement);
  control = new OrbitControls(camera, renderer.domElement);
}

function addMesh() {
  const material = new THREE.MeshLambertMaterial();
  boxes = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.1, 0.1, 0.1),
    material,
    100
  );
  spheres = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.075),
    material,
    100
  );
  const matrix = new THREE.Matrix4();
  const color = new THREE.Color();
  for (let i = 0; i < boxes.count; i++) {
    matrix.setPosition(
      Math.random() - 0.5,
      Math.random() * 2,
      Math.random() - 0.5
    );
    boxes.setMatrixAt(i, matrix);
    boxes.setColorAt(i, color.setHex(Math.random() * 0xffffff));
  }
  for (let i = 0; i < spheres.count; i++) {
    matrix.setPosition(
      Math.random() - 0.5,
      Math.random() * 2,
      Math.random() - 0.5
    );
    spheres.setMatrixAt(i, matrix);
    spheres.setColorAt(i, color.setHex(Math.random() * 0xffffff));
  }
  scene.add(boxes, spheres);

  floor = new THREE.Mesh(
    new THREE.BoxGeometry(10, 1, 10),
    new THREE.ShadowMaterial({ color: 0x111111 })
  );
  floor.position.set(0, -1, 0);
  scene.add(floor);
}

function addLight() {
  const envLight = new THREE.HemisphereLight();
  envLight.intensity = 0.3;
  scene.add(envLight);

  light = new THREE.DirectionalLight(0xffffff, 1.0);
  light.position.set(5, 5, -5);
  scene.add(light);
}

function addShadow() {
  renderer.shadowMap.enabled = true;
  light.castShadow = true;
  boxes.castShadow = true;
  spheres.castShadow = true;
  floor.receiveShadow = true;
}

async function addPhysics() {
  phiscis = await OimoPhysics();
  phiscis.addMesh(floor, 0);
  phiscis.addMesh(boxes, 1);
  phiscis.addMesh(spheres, 1);
}

function render() {
  renderer.render(scene, camera);
  control.update();
  let index = Math.floor(Math.random() * boxes.count);
  position.set(0, Math.random() + 1, 0);
  phiscis.setMeshPosition(boxes, position, index);
  index = Math.floor(Math.random() * spheres.count);
  position.set(0, Math.random() + 1, 0);
  phiscis.setMeshPosition(spheres, position, index);
  requestAnimationFrame(render);
}
