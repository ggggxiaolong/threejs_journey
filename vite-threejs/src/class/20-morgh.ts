import * as THREE from "three";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Size } from "./model";
import { Util } from "./utils";
import { GUI } from "lil-gui";

const size = Size.getInstance();
const scene = new THREE.Scene();
const camera = Util.initCamera(size);
const renderer = Util.initRenderer(size);
const control = Util.initControl(camera, renderer);
const loader = new GLTFLoader();
let mixer: THREE.AnimationMixer;
const clock = new THREE.Clock();
const actions: Array<THREE.AnimationAction> = Array();
const actionNames: Array<string> = Array();
const loopActionIndex: Array<number> = [0, 2, 6, 10];
const loopActionNames: Array<string> = Array();
const mixActionNames: Array<string> = Array();
let mixAction = 0;
let preAction = 0;
const gui = new GUI();
const params = { play: "", mixAction: "" };

init();

function init() {
  camera.position.set(-5, 3, 10);
  camera.lookAt(new THREE.Vector3(0, 2, 0));
  // Util.addAxesHelper(scene, 2);

  size.onResize(() => {
    Util.onResize(size, camera, renderer);
  });
  loader.load("./gltf/RobotExpressive/RobotExpressive.glb", function (glb) {
    console.log(glb)
    scene.add(glb.scene);
    mixer = new THREE.AnimationMixer(glb.scene);
    const animations = glb.animations;
    animations.forEach((clipAction, index) => {
      const action = mixer.clipAction(clipAction);
      actions.push(action);
      actionNames.push(clipAction.name);
      if (loopActionIndex.includes(index)) {
        loopActionNames.push(clipAction.name);
      } else {
        mixActionNames.push(clipAction.name);
        action.clampWhenFinished = true;
        action.loop = THREE.LoopOnce;
      }
    });
    actions[0].play();
    params.play = actionNames[0];
    params.mixAction = mixActionNames[0];
    gui
      .add(params, "play")
      .options(loopActionNames)
      .onChange(function () {
        const action = actionNames.indexOf(params.play);
        switchAction(action);
      });
    gui
      .add(params, "mixAction")
      .options(mixActionNames)
      .onChange(function () {
        const action = actionNames.indexOf(params.mixAction);
        complexAction(action);
      });

    const face = glb.scene.getObjectByName("Head_4");
    if (face instanceof THREE.Mesh && face.morphTargetDictionary && face.morphTargetInfluences) {
      console.log(face);
      const expression = Object.keys(face.morphTargetDictionary);
      for (let i = 0; i < expression.length; i++) {
        gui.add(face.morphTargetInfluences, `${i}`, 0, 1, 0.1).name(expression[i]);
      }
    }
    render();
  });

  renderer.outputEncoding = THREE.sRGBEncoding;
  const floor = new Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);
  scene.background = new THREE.Color(0xacacac);
  scene.fog = new THREE.Fog(0xacacac, 10, 50);
  const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
  (grid.material as THREE.Material).opacity = 0.2;
  (grid.material as THREE.Material).transparent = true;
  scene.add(grid);

  const envLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(envLight);
  const directLight = new THREE.DirectionalLight(0xffffff, 1);
  directLight.position.set(0, 5, 2);
  scene.add(directLight);
}

function switchAction(action: number, duration: number = 0.5) {
  actions[preAction].fadeOut(duration);
  preAction = action;
  actions[preAction].reset().fadeIn(duration).play();
}

function complexAction(action: number, duration: number = 0.2) {
  mixAction = action;
  actions[preAction].fadeOut(duration);
  actions[mixAction].reset().fadeIn(duration).play();
  mixer.addEventListener("finished", restoreAction);
}

function restoreAction() {
  actions[mixAction].fadeOut(0.2);
  actions[preAction].reset().fadeIn(0.2).play();
  mixer.removeEventListener("finished", restoreAction);
}

function render() {
  const delta = clock.getDelta();
  renderer.render(scene, camera);
  control.update();
  mixer.update(delta);
  requestAnimationFrame(render);
}
