import "./style.css";
import * as THREE from "three";
// import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

const gui = new dat.GUI();
const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

// const loader = new THREE.TextureLoader();

// cube gui
// size, count,
// line radius
// branch
// random
// color
const parameter = {};
parameter.count = 30000;
parameter.size = 0.02;
parameter.radius = 5;
parameter.branch = 3;
parameter.randomness = 5;
parameter.randomnessPow = 2.5;
parameter.spin = 1.2;
parameter.innerColor = '#d43a3a'
parameter.outerColor = '#252598'

gui.add(parameter, "count", 100, 100000, 10).onFinishChange(generateGalaxy);
gui.add(parameter, "size", 0.01, 1, 0.001).onFinishChange(generateGalaxy);
gui.add(parameter, "radius", 1, 10, 1).onFinishChange(generateGalaxy);
gui.add(parameter, "branch", 1, 10, 1).onFinishChange(generateGalaxy);
gui.add(parameter, "randomness", 0, 5, 0.01).onFinishChange(generateGalaxy);
gui.add(parameter, "randomnessPow", 1, 10, 0.1).onFinishChange(generateGalaxy);
gui.add(parameter, "spin", -5, 5, 0.1).onFinishChange(generateGalaxy);
gui.addColor(parameter, "innerColor").onFinishChange(generateGalaxy);
gui.addColor(parameter, "outerColor").onFinishChange(generateGalaxy);

let geometry = null;
let material = null;
let points = null;

function generateGalaxy() {
  if (geometry != null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  geometry = new THREE.BufferGeometry();
  material = new THREE.PointsMaterial({
    size: parameter.size,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
  });
  const positions = new Float32Array(parameter.count * 3);
  const colors = new Float32Array(parameter.count * 3);
  const brachAngle = (Math.PI * 2) / parameter.branch;
  const innerColor = new THREE.Color(parameter.innerColor)
  const outerColor = new THREE.Color(parameter.outerColor)

  for (let i = 0; i < parameter.count; i++) {
    const i3 = i * 3;
    const random = Math.random();
    // const fixRandom = random - 0.5
    const radius = random * parameter.radius;
    const spinAngle = radius * parameter.spin;
    const branchIndex = i % parameter.branch;
    positions[i3] = 
      radius * Math.cos(branchIndex * brachAngle + spinAngle) +
      Math.pow(Math.random(), parameter.randomnessPow) *
        (Math.random() > 0.5 ? 1 : -1);
    positions[i3 + 1] = 
      Math.pow(Math.random(), parameter.randomnessPow) *
      (Math.random() > 0.5 ? 1 : -1);
    positions[i3 + 2] = 
      radius * Math.sin(branchIndex * brachAngle + spinAngle) +
      Math.pow(Math.random(), parameter.randomnessPow) *
        (Math.random() > 0.5 ? 1 : -1);
    const mixColor = innerColor.clone()
    mixColor.lerp(outerColor, random)
    colors[i3] = mixColor.r
    colors[i3 + 1] = mixColor.g
    colors[i3 + 2] = mixColor.b
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 3)
  );
  points = new THREE.Points(geometry, material);
  scene.add(points);
}

generateGalaxy();

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
});

const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100
);

camera.position.set(0, 8, 0);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(size.width, size.height);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0x262837);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const clock = new THREE.Clock();

function tick() {
  // const elapsedTime = clock.getElapsedTime();
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();
