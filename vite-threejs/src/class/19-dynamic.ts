import * as THREE from "three";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import { Size } from "./model";
import { Util } from "./utils";

const size = Size.getInstance();
const scene = new THREE.Scene();
const camera = Util.initCamera(size, 60, 20000);
const renderer = Util.initRenderer(size);
const control = new FirstPersonControls(camera, renderer.domElement);
const clock = new THREE.Clock();
const loader = new THREE.TextureLoader();
let geometry: THREE.PlaneGeometry

init();
render();

function init() {
  camera.position.set(0, 100, 300);
  Util.addAxesHelper(scene, 1);
  size.onResize(function () {
    Util.onResize(size, camera, renderer);
  });
  control.handleResize();
  const texture = loader.load("./textures/water.jpg");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(5, 5);
  scene.background = new THREE.Color(0xaaccff);
  scene.fog = new THREE.FogExp2(0xaaccff, 0.0007);
  control.movementSpeed = 500;
  control.lookSpeed = 0.05;

  geometry = new THREE.PlaneGeometry(20000, 20000, 127, 127);
  geometry.rotateX(-Math.PI / 2);
  const position = geometry.attributes.position as THREE.BufferAttribute;
  position.usage = THREE.DynamicDrawUsage;
  for (let i=0; i< position.count; i++){
    position.setY(i, Math.sin(i/2) * 35);
  }
  
  const material = new THREE.MeshBasicMaterial({map: texture, color: 0x0044ff,})
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}

function render() {
  const delta = clock.getDelta();
  const time = clock.getElapsedTime() * 10;
  renderer.render(scene, camera);
  control.update(delta);
  const position = geometry.attributes.position as THREE.BufferAttribute;
  position.usage = THREE.DynamicDrawUsage;
  for (let i=0; i< position.count; i++){
    const y = 35 * Math.sin( i / 5 + ( time + i ) / 7 );
    position.setY(i, y);
  }
  position.needsUpdate = true;
  requestAnimationFrame(render);
}
