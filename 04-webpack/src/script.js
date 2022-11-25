import "./style.css";
import * as THREE from "three";
// import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper"
import { BoxGeometry, Mesh, SphereGeometry } from "three";
import * as dat from "dat.gui";

const gui = new dat.GUI();
const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.1;
material.roughness = 0.5;
material.side = THREE.DoubleSide;

gui.add(material, "metalness", 0, 1, 0.1);
gui.add(material, "roughness", 0, 1, 0.1);

const planeMesh = new THREE.Mesh(new THREE.PlaneGeometry(6, 4), material);
planeMesh.geometry.center();
planeMesh.rotation.x = -Math.PI * 0.35;
planeMesh.position.y = -1;
scene.add(planeMesh);

const boxMesh = new Mesh(new BoxGeometry(1, 1), material);
scene.add(boxMesh);

const torusMesh = new Mesh(new THREE.TorusGeometry(0.4, 0.2, 16, 32), material);
torusMesh.position.x = 1.5;
scene.add(torusMesh);

const sphereMesh = new Mesh(new SphereGeometry(0.6, 16, 16), material);
sphereMesh.position.x = -1.5;
scene.add(sphereMesh);

// add light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directLight = new THREE.DirectionalLight(0x00fffc, 0.3);
directLight.position.set(1.5, 1.5, 0.5);
scene.add(directLight);

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
scene.add(hemisphereLight);

const pointLight = new THREE.PointLight(0xff9000, 0.5, 1);
pointLight.position.set(1, -1, 1);
scene.add(pointLight);

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
rectAreaLight.position.set(-1, 0, 2);
scene.add(rectAreaLight);

const spotLight = new THREE.SpotLight(0x78ff00, 0.3, 10, Math.PI * 0.2, 0.25, 1.5);
spotLight.position.set(-2, 1, 3)
scene.add(spotLight)

const directLightHelper = new THREE.DirectionalLightHelper(directLight, 1);
scene.add(directLightHelper)

const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 1);
scene.add(hemisphereLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(pointLightHelper)

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight, 1)
scene.add(rectAreaLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight, 1);
scene.add(spotLightHelper)

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
  const elapsedTime = clock.getElapsedTime() * 0.1;
  boxMesh.rotation.x = elapsedTime;
  boxMesh.rotation.y = elapsedTime;
  torusMesh.rotation.x = elapsedTime;
  torusMesh.rotation.y = elapsedTime;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();
