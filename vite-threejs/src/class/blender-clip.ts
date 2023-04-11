import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { AmbientLight } from "three";
import { Size } from "./model";
import { Util } from "./utils";
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import {
  CSS2DRenderer,
} from "three/examples/jsm/renderers/CSS2DRenderer";

const size = Size.getInstance();
const scene = new THREE.Scene();
const camera = Util.initCamera(size, 40, 100);
const renderer = Util.initRenderer(size);
const control = Util.initControl(camera, renderer);
const loader = new GLTFLoader();
const labelRenderer = new CSS2DRenderer();
const clock = new THREE.Clock();
// const mouse = Mouse.getInstance();
// const MODEL_HEIGHT = 8;
// const MODEL_WIDTH = 16;
// const group = new THREE.Group();
let cabinMesh: THREE.Group;
let mixer: THREE.AnimationMixer | null = null;
// const gui = new GUI();
// const param = { size: 1 };

init();
render();

function init() {
  const deccoder = new DRACOLoader();
  deccoder.setDecoderPath("./gltf/");
  loader.setDRACOLoader(deccoder);
  labelRenderer.setSize(size.width, size.height);
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.top = "0px";
  labelRenderer.domElement.style.pointerEvents = "none";
  document.body.appendChild(labelRenderer.domElement);
  camera.position.set(0, 0, 20);
  size.onResize(function () {
    Util.onResize(size, camera, renderer);
    labelRenderer.setSize(size.width, size.height);
  });
  scene.background = new THREE.Color(0x000000);
  // renderer.outputEncoding = THREE.sRGBEncoding;
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.01).texture;
  const envLight = new AmbientLight(0xffffff, 0.1);
  scene.add(envLight);
  loader.load("./models/cabin02.glb", function (glb) {
    console.log(glb);
    mixer = new THREE.AnimationMixer(glb.scene);
    const animation = glb.animations[0];
    const animate = mixer.clipAction(animation);
    animate.repetitions = 1;
    animate.clampWhenFinished = true;
    animate.play();
    const animation2 = glb.animations[1];
    const animate2 = mixer.clipAction(animation2);
    animate2.repetitions = 1;
    animate2.clampWhenFinished = true;
    animate2.play();

    cabinMesh = glb.scene;
    cabinMesh.rotation.y = -Math.PI / 2;  
    // // cabinMesh.traverse(function(mesh){
    // //   if(mesh instanceof THREE.Mesh){
    // //     mesh.material.color.setRGB( color, color, color )
    // //   }
    // // })
    // showCabin(param.size)
    // gui.add(param, "size", 1, 300, 1).onChange(function () {
    //   showCabin(param.size)
    // });
    // scene.add(cabinMesh)
    scene.add(cabinMesh)
  });
  // scene.add(group)
  
}

function render() {
  renderer.render(scene, camera); 
  labelRenderer.render(scene, camera);
  control.update();
  mixer?.update(clock.getDelta());
  requestAnimationFrame(render);
}
