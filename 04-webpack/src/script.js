import "./style.css";
import * as THREE from "three";
// import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();
const gui = new dat.GUI();
//texture
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const gradientTexture = textureLoader.load("/textures/gradients/5.jpg");
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;

const matcapTexture = textureLoader.load("/textures/matcaps/1.png");

const envTexture = cubeTextureLoader
  .setPath("/textures/environmentMaps/2/")
  .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);

// const material = new THREE.MeshBasicMaterial({
//   // color: "red",
//   side: THREE.DoubleSide,
// });
// material.wireframe = true
// material.map = doorColorTexture;
// material.transparent = true;
// material.opacity = 0.5
// material.alphaMap = doorAlphaTexture;

// const material = new THREE.MeshNormalMaterial()
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture
// material.flatShading = true

// const material = new THREE.MeshDepthMaterial()
// 加灯
// const material = new THREE.MeshLambertMaterial()
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular.set(0xff0000)

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

// 添加debug gui
const material = new THREE.MeshStandardMaterial();
// material.side = THREE.DoubleSide
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.05
// material.transparent = true
// material.alphaMap = doorAlphaTexture
// material.normalMap = doorNormalTexture
// // material.normalScale.set(20, 20)
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture

//环境
material.envMap = envTexture
material.metalness = 0.8
material.roughness = 0.01

gui.add(material, "metalness", 0, 1, 0.001);
gui.add(material, "roughness", 0, 1, 0.001);
// gui.add(material, "aoMapIntensity", 0, 5, 0.1).name("intensity")
// gui.add(material, "displacementScale", 0, 1, 0.01).name("height")

// const planeMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
// console.log(planeMesh.geometry.attributes);
// planeMesh.geometry.setAttribute("uv2", new THREE.BufferAttribute(planeMesh.geometry.attributes.uv.array, 2))
const planeMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);

const sphereMesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  material
);
// const sphereMesh = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1, 48, 48, 48),
//   material
// );
sphereMesh.position.x = -1.5;
sphereMesh.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphereMesh.geometry.attributes.uv.array, 2)
);

const torusMesh = new THREE.Mesh(
  new THREE.TorusGeometry(0.5, 0.2, 64, 128),
  material
);
torusMesh.position.x = 1.5;
torusMesh.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torusMesh.geometry.attributes.uv.array, 2)
);

scene.add(planeMesh, sphereMesh, torusMesh);

// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

const light2 = new THREE.PointLight(0xffffff, 0.5);
light2.position.set(2, 3, 4);
scene.add(light2);

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

camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(size.width, size.height);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const clock = new THREE.Clock();

function tick() {
  controls.update();

  // const elapsed = clock.getElapsedTime();
  // planeMesh.rotation.x = elapsed * 0.1;
  // planeMesh.rotation.y = elapsed * 0.1;

  // sphereMesh.rotation.x = elapsed * 0.1;
  // sphereMesh.rotation.y = elapsed * 0.1;

  // torusMesh.rotation.x = elapsed * 0.1;
  // torusMesh.rotation.y = elapsed * 0.1;

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();
