import "./style.css";
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  RawShaderMaterial,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

const canvas = document.querySelector("canvas.webgl");
const scene = new Scene();

const material = new RawShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
});
const flagMesh = new Mesh(new PlaneGeometry(1.5, 1.5), material);
scene.add(flagMesh);

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
};

const camera = new PerspectiveCamera(75, size.width / size.height, 0.01, 100);
camera.position.set(0, 0, 3);
scene.add(camera);
const render = new WebGLRenderer({ canvas: canvas, antialias: true });
render.setSize(size.width, size.height);
render.setPixelRatio(size.devicePixelRatio);

const control = new OrbitControls(camera, canvas);

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  size.pixelRatio = Math.min(window.devicePixelRatio, 2);

  render.setSize(size.width, size.height);
  render.setPixelRatio(size.devicePixelRatio);
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
});

function update() {
  render.render(scene, camera);
  control.update();
  window.requestAnimationFrame(update);
}
update();
