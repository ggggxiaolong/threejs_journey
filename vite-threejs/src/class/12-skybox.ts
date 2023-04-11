import * as THREE from "three";
import { Size } from "./model";
import { Util } from "./utils";

const size = Size.getInstance();
const scene = new THREE.Scene();
const camera = Util.initCamera(size);
const renderer = Util.initRenderer(size);
const control = Util.initControl(camera, renderer);
const loader = new THREE.CubeTextureLoader();
const matrix = new THREE.Matrix4();
// const clock = new THREE.Clock();
let mesh: THREE.InstancedMesh;
//

init();
render();
size.onResize(function () {
  Util.onResize(size, camera, renderer);
});

function init() {
  camera.position.set(0, 2, 18);
  //   Util.addAxeisHelper(scene, 1);
  renderer.outputEncoding = THREE.sRGBEncoding;

  const texture = loader
    .setPath("./textures/cube/pisa/")
    .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);
  scene.background = texture;
  // scene.environment = texture;
  mesh = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.1),
    new THREE.MeshBasicMaterial({ color: 0xffffff, envMap: texture }),
    500
  );
  const quaternion = new THREE.Quaternion();
  const position = new THREE.Vector3();
  const scale = new THREE.Vector3();
  for (let i = 0; i < 500; i++) {
    position.set(
      Math.random() * 10 - 5,
      Math.random() * 10 - 5,
      Math.random() * 10 - 5
    );
    const s = Math.random() * 3 + 1;
    scale.set(s, s, s);
    matrix.compose(position, quaternion, scale);
    mesh.setMatrixAt(i, matrix);
  }
  scene.add(mesh);
}

function render() {
  renderer.render(scene, camera);
  control.update();
  requestAnimationFrame(render);
}
