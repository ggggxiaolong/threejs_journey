import "./style.css";
import {
  Color,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { GUI } from "dat.gui";

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
};

const canvas = document.querySelector("canvas.webgl");
const scene = new Scene();
const gui = new GUI();

const material = new ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    u_color: { value: new Color("#ff00ff") },
  },
});


const geomtry = new PlaneGeometry(1.5, 1.5, 32, 32);
const flagMesh = new Mesh(geomtry, material);
scene.add(flagMesh);

const camera = new PerspectiveCamera(75, size.width / size.height, 0.01, 100);
camera.position.set(0, 0, 3);
scene.add(camera);
const render = new WebGLRenderer({ canvas: canvas, antialias: true });
render.setSize(size.width, size.height);
render.setPixelRatio(size.devicePixelRatio);
render.setClearColor(0x333333);

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
  window.requestAnimationFrame(update);
}
update();
