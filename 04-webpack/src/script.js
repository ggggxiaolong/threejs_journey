import "./style.css";
import * as THREE from "three";
// import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
// import * as dat from "dat.gui";

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

// const material = new THREE.MeshBasicMaterial();
// material.wireframe = true;

const loader = new THREE.TextureLoader();
const texture = loader.load("/textures/matcaps/2.png");
const material = new THREE.MeshMatcapMaterial()
material.matcap = texture

const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", function (font) {
  // console.log(font);
  const geometry = new TextGeometry("Hello Three.js", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 6,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });

  const fontMesh = new THREE.Mesh(geometry, material);
  // geometry.computeBoundingBox();
  // geometry.translate(
  //   -(geometry.boundingBox.max.x - 0.02) * 0.5,
  //   -(geometry.boundingBox.max.y - 0.02) * 0.5,
  //   -(geometry.boundingBox.max.z - 0.03) * 0.5
  // );
  // geometry.computeBoundingBox();
  // console.log(geometry.boundingBox);
  geometry.center()
  scene.add(fontMesh);
});

const geometry = new THREE.TorusGeometry( 0.3, 0.2, 20, 45 );

// console.time("torusMesh")
for (let index = 0; index < 150; index++) {
    const torusMesh = new THREE.Mesh(geometry, material);
    torusMesh.position.x = (Math.random() -0.5) * 8
    torusMesh.position.y = (Math.random() -0.5) * 8
    torusMesh.position.z = (Math.random() -0.5) * 8

    torusMesh.rotation.x = Math.random() * Math.PI
    torusMesh.rotation.y = Math.random() * Math.PI

    const scale = Math.random()
    torusMesh.scale.set(scale, scale, scale)
    scene.add(torusMesh)
}
// console.timeEnd("torusMesh")
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

camera.position.z = 5;
scene.add(camera);

// const axiesHelper = new THREE.AxesHelper();
// scene.add(axiesHelper);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(size.width, size.height);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const clock = new THREE.Clock();

function tick() {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();
