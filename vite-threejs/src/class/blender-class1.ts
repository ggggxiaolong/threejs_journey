import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AmbientLight } from "three";
import { Size } from "./model";
import { Util } from "./utils";

const size = Size.getInstance();
const scene = new THREE.Scene();
const camera = Util.initCamera(size);
const renderer = Util.initRenderer(size);
const control = Util.initControl(camera, renderer);
const loader = new GLTFLoader();
let mixer: THREE.AnimationMixer;
const clock = new THREE.Clock()

init();
// render();

function init() {
  camera.position.set(0, 2, 20);
  Util.addAxesHelper(scene, 1);
  size.onResize(function () {
    Util.onResize(size, camera, renderer);
  });
  scene.background = new THREE.Color(0xcccccc);
  renderer.outputEncoding = THREE.sRGBEncoding;

  // const floor = new THREE.Mesh(
  //   new THREE.PlaneGeometry(15, 15),
  //   new THREE.MeshBasicMaterial({ color: 0x044DC9 })
  // );
  // floor.rotation.x = -Math.PI / 2;
  // floor.position.y = -0.5;
  // scene.add(floor);
  const envLight = new AmbientLight(0xffffff, 0.4);
  scene.add(envLight);
  const light1 = new THREE.SpotLight(0xffffff, 2.5);
  light1.position.set(-3, 15, 15);
  light1.angle = Math.PI / 4;
  light1.distance = 45;
//   const helper1 = new THREE.SpotLightHelper(light1);
//   scene.add(helper1);
  scene.add(light1);
  const light2 = new THREE.SpotLight(0xffffff, 1);
  light2.position.set(10, 15, 15);
  light2.distance = 35;
  light2.angle = Math.PI / 3;
  scene.add(light2);
//   const helper2 = new THREE.SpotLightHelper(light2);
//   scene.add(helper2);
  loader.load("./models/class1.glb", function (glb) {
    console.log(glb);
    glb.scene.position.z = -10;
    scene.add(glb.scene);
    mixer = new THREE.AnimationMixer(glb.scene);
    const animation = glb.animations[0];
    
    const action = mixer.clipAction(animation);
    console.log(action);
    action.play()
    render()
  });
}

function render() {
  renderer.render(scene, camera);
  control.update();
  mixer.update(clock.getDelta())
  requestAnimationFrame(render);
}
