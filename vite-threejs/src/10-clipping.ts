import * as THREE from "three";
import { Size } from "./model";
import { Util } from "./utils";

const scene = new THREE.Scene();
const size = Size.getInstance();
const renderer = Util.initRenderer(size);
const camera = Util.initCamera(size);
const control = Util.initControl(camera, renderer);
let material: THREE.MeshPhongMaterial;
let mesh: THREE.Mesh;

init();
clip();
render();

function init() {
  // renderer.outputEncoding = THREE.sRGBEncoding;
  scene.background = new THREE.Color(0x999999);
  camera.position.set(0, 3, 4);
  Util.addAxeisHelper(scene, 1);
  size.onResise(function () {
    Util.onResize(size, camera, renderer);
  });
  material = new THREE.MeshPhongMaterial({ color: 0x80ee10, shininess: 100, side: THREE.DoubleSide });
  const geomotry = new THREE.TorusKnotGeometry(0.4, 0.08, 100, 20);
  mesh = new THREE.Mesh(geomotry, material);
  scene.add(mesh);
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({ color: 0xcccccc })
  );
  floor.position.set(0, -1, 0);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const envLight = new THREE.AmbientLight(0x505050, 0.3);
  scene.add(envLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(0, 4, 0);
  scene.add(dirLight);
  const spotLight = new THREE.SpotLight(0xffffff, 1, 100, Math.PI / 8, 0.1);
  spotLight.position.set(6, 3, 3);
  scene.add(spotLight);

  renderer.shadowMap.enabled = true;
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.set(1024, 1024);
  dirLight.shadow.camera.near = 3;
  dirLight.shadow.camera.far = 5.1;
  dirLight.shadow.camera.left = -1;
  dirLight.shadow.camera.right = 1;
  dirLight.shadow.camera.top = 1;
  dirLight.shadow.camera.bottom = -1;
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.set(1024, 1024);
  spotLight.shadow.camera.near = 6;
  spotLight.shadow.camera.far = 9;
  floor.receiveShadow = true;
  mesh.castShadow = true;

  // const dirHelper = new THREE.CameraHelper(dirLight.shadow.camera);
  // scene.add(dirHelper);
  // scene.add(new THREE.CameraHelper(spotLight.shadow.camera))
}

function clip() {
  const plain = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0.2);
  const plain1 = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0.2);
//   const plain2 = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);

  material.clipShadows = true;
  material.side = THREE.DoubleSide;
  material.clippingPlanes = [plain, plain1];
  renderer.localClippingEnabled = true;
    // renderer.clippingPlanes = [plain]
}

function render() {
  renderer.render(scene, camera);
  mesh.rotation.y += 0.02;
  control.update();
  requestAnimationFrame(render);
}
