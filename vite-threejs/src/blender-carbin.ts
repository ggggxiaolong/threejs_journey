import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AmbientLight } from "three";
import { Size } from "./model";
import { Util } from "./utils";
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer";

const size = Size.getInstance();
const scene = new THREE.Scene();
const camera = Util.initCamera(size);
const renderer = Util.initRenderer(size);
const control = Util.initControl(camera, renderer);
const loader = new GLTFLoader();
const labelRenderer = new CSS2DRenderer();
const MODEL_HEIGHT = 8;
const MODEL_WIDTH = 12;

init();
render();

function init() {
  labelRenderer.setSize(size.width, size.height);
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.top = "0px";
  labelRenderer.domElement.style.pointerEvents = "none";
  document.body.appendChild(labelRenderer.domElement);
  camera.position.set(0, 12, 20);
  // Util.addAxesHelper(scene, 30);
  size.onResize(function () {
    Util.onResize(size, camera, renderer);
    labelRenderer.setSize(size.width, size.height);
  });
  scene.background = new THREE.Color(0xcccccc);
  renderer.outputEncoding = THREE.sRGBEncoding;
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
  const envLight = new AmbientLight(0xffffff, 0.4);
  scene.add(envLight);
  loader.load("/models/carbin2.glb", function (glb) {
    console.log(glb.scene);
    showCabin(glb.scene, 5)
  });
}

function showCabin(mesh: THREE.Group, size: number) {
  const group = new THREE.Group();
  const x = Math.floor(Math.sqrt(size));
  const y = x * x == size ? x : x + 1;
  const maxCount = x * y;
  let count = 1;
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (size > maxCount - count) {
        const cabin = mesh.clone();
        cabin.position.set(i * MODEL_WIDTH, 0, j * MODEL_HEIGHT);
        group.add(cabin)
        const textElement = document.createElement("div");
        textElement.className = "label";
        // textElement.style.color = `rgb(${metaData[3][0]}, ${metaData[3][1]}, ${metaData[3][2]})`;
        textElement.textContent = `sn:${i}-${j}`;
        const label = new CSS2DObject(textElement);
        label.position.set(i * MODEL_WIDTH + 3, 3, j * MODEL_HEIGHT + 1);
        group.add(label);
      } else {
        const cabin = mesh.children[2].clone();
        cabin.position.set(i * MODEL_WIDTH, 0, j * MODEL_HEIGHT);
        group.add(cabin)
      }
      count += 1;
    }
  }
  group.position.x -= x * MODEL_WIDTH / 2;
  group.position.z -= y * MODEL_HEIGHT / 2;
  scene.add(group)
}

function render() {
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  control.update();
  requestAnimationFrame(render);
}
