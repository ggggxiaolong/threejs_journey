import "./style.css";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Clock,
  Color,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from "./shaders/galaxy/vertex.glsl";
import fragmentShader from "./shaders/galaxy/fragment.glsl";
import { GUI } from "dat.gui";

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
};

const canvas = document.querySelector("canvas.webgl");
const scene = new Scene();
const gui = new GUI();
const params = {};

params.size = 0.01;
params.count = 100000;

const geometry = new BufferGeometry();
const material = new ShaderMaterial({
  // size: params.size,
  depthWrite: false,
  vertexColors: true,
  blending: AdditiveBlending,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms:{
    uSize: {value: 8.0 * size.pixelRatio},
    uTime: {value: 0.0},
  }
});

params.branch = 3;
params.radius = 3;
params.power = 3;
params.randomness = 0.2;

const positions = new Float32Array(params.count * 3);
const randomPosition = new Float32Array(params.count * 3);
const colors = new Float32Array(params.count * 3);
const scales = new Float32Array(params.count);
const innerColor = new Color("#ff6030")
const outsideColor = new Color("#1b3984")
for (let i = 0; i < params.count; i++) {
  const i3 = i * 3;
  const angle = (((i % params.branch) * Math.PI) / 3) * 2;
  const radius = Math.random() * params.radius;

  const randomX = Math.pow(Math.random(), params.power) * (Math.random() > 0.5 ? 1 : -1) * params.randomness * radius;
  const randomY = Math.pow(Math.random(), params.power) * (Math.random() > 0.5 ? 1 : -1) * params.randomness * radius;
  const randomZ = Math.pow(Math.random(), params.power) * (Math.random() > 0.5 ? 1 : -1) * params.randomness * radius;


  positions[i3] = Math.cos(angle) * radius;
  positions[i3 + 1] = 0.0;
  positions[i3 + 2] = Math.sin(angle) * radius;

  randomPosition[i3] = randomX;
  randomPosition[i3 + 1] =  randomY;
  randomPosition[i3 + 2] = randomZ;

  const mixColor = innerColor.clone()
  mixColor.lerp(outsideColor, radius / params.radius);
  colors[i3] = mixColor.r;
  colors[i3 + 1] = mixColor.g;
  colors[i3 + 2] = mixColor.b;

  scales[i] = Math.random();
}
geometry.setAttribute("position", new BufferAttribute(positions, 3));
geometry.setAttribute("color", new BufferAttribute(colors, 3));
geometry.setAttribute("aRandom", new BufferAttribute(randomPosition, 3));
geometry.setAttribute("aScale", new BufferAttribute(scales, 1));

const points = new Points(geometry, material);
scene.add(points);

const camera = new PerspectiveCamera(75, size.width / size.height, 0.01, 100);
camera.position.set(-1, 2, 4);
scene.add(camera);
const render = new WebGLRenderer({ canvas: canvas, antialias: true });
render.setSize(size.width, size.height);
render.setPixelRatio(size.devicePixelRatio);
render.setClearColor(0x333333);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  size.pixelRatio = Math.min(window.devicePixelRatio, 2);

  render.setSize(size.width, size.height);
  render.setPixelRatio(size.devicePixelRatio);
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  material.uniforms.uSize.value = 8.0 * size.pixelRatio;
});

const clock = new Clock();

function update() {
  material.uniforms.uTime.value = clock.getElapsedTime();
  render.render(scene, camera);
  controls.update();
  window.requestAnimationFrame(update);
}
update();
