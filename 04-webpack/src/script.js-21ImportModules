import "./style.css";
import * as THREE from "three";
// import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { AnimationMixer } from "three";
import * as dat from "dat.gui";
// import * as CANNON from "cannon-es";

const gui = new dat.GUI();
const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

const params = {}
let model = null;
let mixer = null;
let previousAction = null;
const glTFLoader = new GLTFLoader();
const darcoLoader = new DRACOLoader();
darcoLoader.setDecoderPath("/libs/draco/");
glTFLoader.setDRACOLoader(darcoLoader);
glTFLoader.load("/models/Fox/glTF/Fox.gltf", (gltf) => {
  model = gltf;
  mixer = new THREE.AnimationMixer(model.scene);
  console.log(model);
  const action = mixer.clipAction(model.animations[2]);
  previousAction = action
  action.play();
  model.scene.scale.set(0.025, 0.025, 0.025);
  scene.add(model.scene);
});

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: 0x777777,
  })
);
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

function fadeToAction(index = 0, duration = 0.2) {
  if (mixer) {
    let animation = model.animations[index];
    const action = mixer.clipAction(animation);
    if (previousAction != null && previousAction != action) {
      previousAction.fadeOut(duration).stop();
    }
    previousAction = action;
    action
      .reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(1)
      .play();
  }
}

params.animationSurvey = function(){
  fadeToAction(0)
}
params.animationWalk = function(){
  fadeToAction(1)
}
params.animationRun = function(){
  fadeToAction(2)
}
gui.add(params, "animationSurvey")
gui.add(params, "animationWalk")
gui.add(params, "animationRun")

//light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 0.2);
light.position.set(5, 2, 0);
light.castShadow = true;
light.shadow.camera.far = 10;
scene.add(light);

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
camera.position.set(10, 6, 0);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(size.width, size.height);
renderer.shadowMap.enabled = true;
// renderer.setClearAlpha(0)

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const clock = new THREE.Clock();
let lastTime = 0;

function tick() {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - lastTime;
  lastTime = elapsedTime;
  if (mixer) {
    mixer.update(deltaTime);
  }

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();
