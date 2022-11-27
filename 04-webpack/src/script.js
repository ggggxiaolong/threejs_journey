import "./style.css";
import * as THREE from "three";
// import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { BoxGeometry, Mesh, MeshBasicMaterial, SphereGeometry } from "three";
import * as dat from "dat.gui";

const gui = new dat.GUI();
const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

const loader = new THREE.TextureLoader();
const shadowTexture = loader.load("/textures/bakedShadow.jpg");
const simpleTexture = loader.load("/textures/simpleShadow.jpg");

const material = new THREE.MeshStandardMaterial();
// const material = new THREE.MeshBasicMaterial();
material.metalness = 0.1;
material.roughness = 0.5;
material.side = THREE.DoubleSide;

gui.add(material, "metalness", 0, 1, 0.1);
gui.add(material, "roughness", 0, 1, 0.1);

// 平面 球
// 直接光
// 开启光影 render 球 面 灯
// helper
// 调节远近大小

// spot light
// point light
// bake shadow

// const planeMesh = new THREE.Mesh(new THREE.PlaneGeometry(6, 5), material);
const planeMesh = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), material);
planeMesh.geometry.center();
planeMesh.rotation.x = -Math.PI * 0.5;
planeMesh.position.y = -0.6;
scene.add(planeMesh);
// planeMesh.receiveShadow = true

const shadowMesh = new Mesh(
  new THREE.PlaneGeometry(1.5, 1.5),
  new MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    alphaMap: simpleTexture,
  })
);
shadowMesh.position.set(0, -0.591, 0);
shadowMesh.rotation.x = -Math.PI * 0.5;
scene.add(shadowMesh);

const sphereMesh = new Mesh(new SphereGeometry(0.6, 16, 16), material);
scene.add(sphereMesh);
// sphereMesh.castShadow = true

// add light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directLight = new THREE.DirectionalLight(0xffffff, 0.4);
directLight.position.set(1.5, 1.5, 0.5);
scene.add(directLight);
directLight.castShadow = true;

// directLight.shadow.mapSize.set(1024, 1024);
// directLight.shadow.camera.near = 1
// directLight.shadow.camera.far = 4
// directLight.shadow.camera.top = 2
// directLight.shadow.camera.bottom = -1
// directLight.shadow.camera.left = 2
// directLight.shadow.camera.right = -2
// directLight.shadow.radius = 10

// const directLightCamerahelper = new THREE.CameraHelper(directLight.shadow.camera)
// directLightCamerahelper.visible = false
// scene.add(directLightCamerahelper)

// const spotLight = new THREE.SpotLight(0xffffff, 0.4, 7, Math.PI * 0.15, 0, 0.3)
// spotLight.position.set(0, 3, 3)
// scene.add(spotLight)
// spotLight.castShadow = true
// spotLight.shadow.mapSize.set(1024, 1024)
// spotLight.shadow.camera.near = 3
// spotLight.shadow.camera.far = 6
// spotLight.shadow.camera.fov = 20

// const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
// spotLightCameraHelper.visible = false
// scene.add(spotLightCameraHelper)

// const pointLight = new THREE.PointLight(0xffffff, 0.4, 8)
// pointLight.position.set(-1.5, 3, 0)
// scene.add(pointLight)
// pointLight.castShadow = true
// pointLight.shadow.camera.near = 2
// pointLight.shadow.camera.far = 3.7

// const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
// pointLightCameraHelper.visible = false
// scene.add(pointLightCameraHelper)

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

camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 6;
scene.add(camera);

// const axiesHelper = new THREE.AxesHelper();
// scene.add(axiesHelper);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(size.width, size.height);
// renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.VSMShadowMap

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const clock = new THREE.Clock();

function tick() {
  const elapsedTime = clock.getElapsedTime();
  sphereMesh.position.x = Math.cos(elapsedTime) * 2;
  sphereMesh.position.z = Math.sin(elapsedTime) * 2;
  sphereMesh.position.y = Math.abs(Math.sin(elapsedTime * 3));

  shadowMesh.position.x = sphereMesh.position.x;
  shadowMesh.position.z = sphereMesh.position.z;
  shadowMesh.material.opacity = (1 - sphereMesh.position.y) * 0.5;
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();
