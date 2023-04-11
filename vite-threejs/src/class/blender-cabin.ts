import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { AmbientLight } from "three";
import { Size } from "./model";
import { Util } from "./utils";
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer";
import { GUI } from "lil-gui";

const size = Size.getInstance();
const scene = new THREE.Scene();
const camera = Util.initCamera(size);
const renderer = Util.initRenderer(size);
const control = Util.initControl(camera, renderer);
const loader = new GLTFLoader();
const labelRenderer = new CSS2DRenderer();
const MODEL_HEIGHT = 8;
const MODEL_WIDTH = 16;
const group = new THREE.Group();
let cabinMesh: THREE.Group;
const gui = new GUI();
const param = { size: 5 };

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
  camera.position.set(0, 12, 20);
  // Util.addAxesHelper(scene, 30);
  size.onResize(function () {
    Util.onResize(size, camera, renderer);
    labelRenderer.setSize(size.width, size.height);
  });
  scene.background = new THREE.Color(0x2f2f2f);
  // renderer.outputEncoding = THREE.sRGBEncoding;
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
  const envLight = new AmbientLight(0xffffff, 0.2);
  scene.add(envLight);
  // const color = 0.65;
  loader.load("./models/cabin_001.glb", function (glb) {
    console.log(glb.scene);
    cabinMesh = glb.scene;
    cabinMesh.rotation.y = - Math.PI / 2;
    // cabinMesh.traverse(function(mesh){
    //   if(mesh instanceof THREE.Mesh){
    //     mesh.material.color.setRGB( color, color, color )
    //   }
    // })
    showCabin(param.size)
    gui.add(param, "size", 1, 300, 1).onChange(function () {
      showCabin(param.size)
    });
    // scene.add(cabinMesh)
  });
  scene.add(group)
}

function showCabin(size: number) {
  while (group.children.length > 0) {
    const mesh = group.children[0];
    mesh.parent?.remove(mesh);
  }
  const y = Math.ceil(Math.sqrt(size));
  const x = y * (y - 1) >= size ? y - 1 : y;
  const maxCount = x * y;
  console.log(`${x},${y}`)
  let count = 1;
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (size > maxCount - count) {
        const cabin = cabinMesh.clone();
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
        // const cabin = cabinMesh.children[2].clone();
        // cabin.position.set(i * MODEL_WIDTH, 0, j * MODEL_HEIGHT);
        // group.add(cabin)
      }
      count += 1;
    }
  }
  group.position.x = -x * MODEL_WIDTH / 2 + MODEL_WIDTH / 2;
  group.position.z = -y * MODEL_HEIGHT / 2 + MODEL_HEIGHT / 2;
  camera.position.set(0, x * 5, y * 8);
}

function render() {
  renderer.render(scene, camera);
  // labelRenderer.render(scene, camera);
  control.update();
  requestAnimationFrame(render);
}
