import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water";
import { Sky } from "three/examples/jsm/objects/Sky";
import { Size } from "./model";
import { Util } from "./utils";
import { GUI } from "lil-gui";

const size = Size.getInstance();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, size.aspect, 1, 20000);
const renderer = Util.initRenderer(size);
const loader = new THREE.TextureLoader();
const control = Util.initControl(camera, renderer);
const clock = new THREE.Clock();
let water: Water;
let sky: Sky;
let box: THREE.Mesh;
let target: THREE.WebGLRenderTarget;
const param = {
  sunElevation: 10,
  sunAzimuth: 20,
};
const gui = new GUI();
let pmremCenerator: THREE.PMREMGenerator;
let sun: THREE.Vector3;

init();
render();

function init() {
  camera.position.set(30, 30, 100);
  // 将超过1的亮度值，统一缩放到0~1
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  //   Util.addAxesHelper(scene, 20);
  size.onResize(function () {
    Util.onResize(size, camera, renderer);
  });
  control.minDistance = 40.0;
  control.maxDistance = 200.0;
  sun = new THREE.Vector3(30, 1, 0);
  water = new Water(new THREE.PlaneGeometry(10000, 10000), {
    textureHeight: 512,
    textureWidth: 512,
    waterNormals: loader.load("./textures/waternormals.jpg", function (texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    }),
    sunDirection: sun,
    distortionScale: 3.7,
    sunColor: 0xffffff,
    waterColor: 0x001e0f,
  });
  water.rotation.x = -Math.PI / 2;
  scene.add(water);

  sky = new Sky();
  sky.scale.setScalar(10000);
  scene.add(sky);
  sky.material.uniforms["sunPosition"].value.copy(sun);
  const skyUniforms = sky.material.uniforms;
  skyUniforms["turbidity"].value = 10;
  skyUniforms["rayleigh"].value = 2;
  skyUniforms["mieCoefficient"].value = 0.005;
  skyUniforms["mieDirectionalG"].value = 0.8;
  gui.add(skyUniforms["turbidity"], "value", 0, 100, 0.1).name("turbidity");
  gui.add(skyUniforms["rayleigh"], "value", 0, 100, 0.1).name("rayleigh");
  gui
    .add(skyUniforms["mieCoefficient"], "value", 0, 1, 0.001)
    .name("mieCoefficient");
  gui
    .add(skyUniforms["mieDirectionalG"], "value", 0, 1, 0.1)
    .name("mieDirectionalG");

  pmremCenerator = new THREE.PMREMGenerator(renderer);
  target = pmremCenerator.fromScene(scene);
  scene.environment = target.texture;
  //   console.log(sky.material);
  updateSun();
  box = new THREE.Mesh(
    new THREE.BoxGeometry(20, 20, 20),
    new THREE.MeshStandardMaterial({ roughness: 0 })
  );
  scene.add(box);
  const skyFolder = gui.addFolder("Sun");
  skyFolder.add(param, "sunElevation", 0, 90, 0.1).onChange(updateSun);
  skyFolder.add(param, "sunAzimuth", -180, 180, 0.1).onChange(updateSun);
  const waterFolder = gui.addFolder("Water");
  const waterUniforms = water.material.uniforms;
  waterFolder
    .add(waterUniforms.distortionScale, "value", 0, 80, 0.1)
    .name("distortionScale");
  waterFolder.add(waterUniforms.size, "value", 0, 10, 0.1).name("size");
}

function updateSun() {
  const phi = THREE.MathUtils.degToRad(90 - param.sunElevation);
  const theta = THREE.MathUtils.degToRad(param.sunAzimuth);
  sun.setFromSphericalCoords(1, phi, theta);
  sky.material.uniforms["sunPosition"].value.copy(sun);
  water.material.uniforms["sunDirection"].value.copy(sun).normalize();
  target.dispose();
  target = pmremCenerator.fromScene(scene);
  scene.environment = target.texture;
}

function render() {
  renderer.render(scene, camera);
  control.update();
  const time = clock.getElapsedTime();
  water.material.uniforms["time"].value = time;
  box.position.y = Math.sin(time) * 20 + 5;
  box.rotation.x = time;
  box.rotation.z = time;
  requestAnimationFrame(render);
}
