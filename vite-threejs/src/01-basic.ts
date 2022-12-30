import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

let scene: THREE.Scene;
let cube: THREE.Mesh;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let size: Size;
let control: OrbitControls;

interface Size {
  width: number;
  height: number;
  pixelRatio: number;
}

init();
render();

function init() {
  size = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2),
  };

  scene = new THREE.Scene();
  const geomertry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  cube = new THREE.Mesh(geomertry, material);
  scene.add(cube);
  camera = new THREE.PerspectiveCamera(75, size.width/size.height, 0.1, 1000);
  camera.position.z = 5;
  camera.position.x = 2;
  camera.position.y = 1;

  const helper = new THREE.AxesHelper(3);
  scene.add(helper);

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(size.pixelRatio);
  document.body.appendChild(renderer.domElement);
  control = new OrbitControls(camera, renderer.domElement);
  control.enableDamping = true;
}

function render() {
    renderer.render(scene, camera);
    cube.rotation.y += 0.01;
    control.update()
    requestAnimationFrame(render)
}

window.addEventListener("resize", function(){
    size.width = this.window.innerWidth;
    size.height = this.window.innerHeight;

    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    renderer.setSize(size.width, size.height);
})
