import "./style.css";
import {
  Clock,
  Color,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
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

const canvas = document.querySelector("canvas.webgl");
const scene = new Scene();
const gui = new GUI();
const params = {};

params.depthColor = "#186691";
params.surfaceColor = "#9bd8ff";

const material = new ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uColor: { value: new Color("#ff00ff") },
    uTime: {value: 0},
    uDepthColor: { value: new Color(params.depthColor)},
    uSurfaceColor: { value: new Color(params.surfaceColor)},
    uColorOffset: {value: 0.08},
    uColorMultiplier: {value: 5},
    uBigWaveFrequency: { value: new Vector2(4, 1.5)},
    uBigWaveSpeed: { value: 0.75},
    uBigWaveElevation: { value: 0.2},
    uSmallWaveElevation: { value: 0.145},
    uSmallWaveFrequency: { value: 4.2},
    uSmallWaveSpeed: { value: 0.7},
    uSmallWaveIterations: { value: 4},
  },
});


gui.add(material.uniforms.uBigWaveElevation, "value", 0, 5, 0.01).name("uBigWaveElevation");
gui.add(material.uniforms.uBigWaveFrequency.value, "x", 0, 5, 0.01).name("bigWaveFrequencyX");
gui.add(material.uniforms.uBigWaveFrequency.value, "y", 0, 5, 0.01).name("bigWaveFrequencyY");
gui.add(material.uniforms.uBigWaveSpeed, "value", 0, 5, 0.01).name("uBigWaveSpeed");

gui.add(material.uniforms.uSmallWaveElevation, "value", 0, 5, 0.01).name("uSmallWaveElevation");
gui.add(material.uniforms.uSmallWaveFrequency, "value", 0, 5, 0.01).name("uSmallWaveFrequency");
gui.add(material.uniforms.uSmallWaveSpeed, "value", 0, 5, 0.01).name("uSmallWaveSpeed");
gui.add(material.uniforms.uSmallWaveIterations, "value", 0, 5, 1).name("uSmallWaveIterations");

gui.addColor(params, "depthColor").onChange(()=>{
  material.uniforms.uDepthColor.value.set(params.depthColor)
})
gui.addColor(params, "surfaceColor").onChange(()=>{
  material.uniforms.uSurfaceColor.value.set(params.surfaceColor)
})
gui.add(material.uniforms.uColorOffset, "value", 0, 5, 0.01).name("uColorOffset");
gui.add(material.uniforms.uColorMultiplier, "value", 0, 5, 1).name("uColorMultiplier");

const geometry = new PlaneGeometry(2, 2, 128, 128);
const flagMesh = new Mesh(geometry, material);
scene.add(flagMesh);

const camera = new PerspectiveCamera(75, size.width / size.height, 0.01, 100);
camera.position.set(0, 0, 2);
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
});

const clock = new Clock()

function update() {
  render.render(scene, camera);
  controls.update()
  material.uniforms.uTime.value = clock.getElapsedTime();
  window.requestAnimationFrame(update);
}
update();
