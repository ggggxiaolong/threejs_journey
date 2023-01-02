import * as THREE from "three";
import { Size } from "./model";
import { Util } from "./utils";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

//LittlestTokyo

let size = Size.getInstance();
let scene = new THREE.Scene();
let renderer = Util.initRenderer(size);
let camera = Util.initCamera(size);
let control = Util.initControl(camera, renderer);
let loader: GLTFLoader;
let mixer: THREE.AnimationMixer|null = null;
const clock = new THREE.Clock()

init();

render();

function init() {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  scene.background = new THREE.Color(0xbfe3dd);
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
  camera.position.set(0, 4, 9);
  renderer.outputEncoding = THREE.sRGBEncoding;
  // Util.addAxeisHelper(scene, 1);
  size.onResise(function () {
    Util.onResize(size, camera, renderer);
  });
  const deccoder = new DRACOLoader();
  deccoder.setDecoderPath("/gltf/");
  loader = new GLTFLoader();
  loader.setDRACOLoader(deccoder);
  loader.load("/models/LittlestTokyo.glb", function (model) {
    model.scene.scale.set(0.01, 0.01, 0.01)
    // model.scene.rotation.y = Math.PI/3;
    scene.add(model.scene);
    mixer = new THREE.AnimationMixer(model.scene)
    const animation = model.animations[0];
    mixer.clipAction(animation).play()
  });
  // const envLight = new THREE.AmbientLight(0xffffff, 1);
  // scene.add(envLight)
}

function render() {
  renderer.render(scene, camera);
  control.update();
  mixer?.update(clock.getDelta())
  requestAnimationFrame(render);
}
