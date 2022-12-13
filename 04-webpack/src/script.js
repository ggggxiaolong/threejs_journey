import "./style.css";
import {
  BoxGeometry,
  BufferAttribute,
  Clock,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  RawShaderMaterial,
  Scene,
  ShaderMaterial,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { GUI } from "dat.gui";

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
};

// console.log(size);
const loader = new TextureLoader();
const canvas = document.querySelector("canvas.webgl");
const scene = new Scene();
const clock = new Clock();
const mouse = new Vector2();
const gui = new GUI();
const params = {};
params.frequency = 3.0;

const flagTexture = loader.load("/textures/frag.jpg");

const material = new ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    u_time: { type: "f", value: clock.getElapsedTime() },
    u_resolution: { type: "v2", value: new Vector2(size.width, size.height) },
    u_mouse: { value: mouse },
    u_color: { value: new Color("#ff00ff") },
    u_frequency: { value: new Vector2(2, 1) },
    u_texture: { value: flagTexture },
  },
});
gui
  .add(material.uniforms.u_frequency.value, "x", 1, 10, 0.1)
  .name("frequencyX");
gui
  .add(material.uniforms.u_frequency.value, "y", 0, 10, 0.1)
  .name("frequencyY");

const geomtry = new PlaneGeometry(1.5, 1.5, 32, 32);
const flagMesh = new Mesh(geomtry, material);
scene.add(flagMesh);
const count = geomtry.attributes.position.array.length;
const randomArray = new Float32Array(count);
for (let i = 0; i < count; i++) {
  randomArray[i] = Math.random();
}
geomtry.setAttribute("aRandom", new BufferAttribute(randomArray, 1));

const camera = new PerspectiveCamera(75, size.width / size.height, 0.01, 100);
camera.position.set(0, 0, 3);
scene.add(camera);
const render = new WebGLRenderer({ canvas: canvas, antialias: true });
render.setSize(size.width, size.height);
render.setPixelRatio(size.devicePixelRatio);
render.setClearColor(0x333333);

const control = new OrbitControls(camera, canvas);
control.enableDamping = true;
// control.enablePan = true;
// control.enabled = false;

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  size.pixelRatio = Math.min(window.devicePixelRatio, 2);

  render.setSize(size.width, size.height);
  render.setPixelRatio(size.devicePixelRatio);
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  material.uniforms.u_resolution.x = size.width;
  material.uniforms.u_resolution.y = size.height;
});

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  material.uniforms.u_mouse.value = mouse;
});

function update() {
  render.render(scene, camera);
  control.update();
  material.uniforms.u_time.value = clock.getElapsedTime();
  window.requestAnimationFrame(update);
}
update();
