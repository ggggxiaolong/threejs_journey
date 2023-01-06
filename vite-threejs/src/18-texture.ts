import {
  Scene,
  TextureLoader,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  sRGBEncoding,
} from "three";
import { Size } from "./model";
import { Util } from "./utils";

const size = Size.getInstance();
const scene = new Scene();
const camera = Util.initCamera(size);
const renderer = Util.initRenderer(size);
let mesh: Mesh;

init();
render();

function init() {
  camera.position.set(0, 0, 500);
  size.onResize(function () {
    Util.onResize(size, camera, renderer);
  });
  renderer.outputEncoding = sRGBEncoding;

  const loader = new TextureLoader();
  const texture = loader.load("/textures/crate.gif");
  const material = new MeshBasicMaterial({ map: texture });
  mesh = new Mesh(new BoxGeometry(200, 200, 200), material);
  scene.add(mesh);
}

function render() {
  renderer.render(scene, camera);
  mesh.rotation.x += 0.005;
  mesh.rotation.y += 0.01;
  requestAnimationFrame(render);
}
