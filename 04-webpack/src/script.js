import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

// const gui = new dat.GUI();
const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

// 地面
// 房屋
// 屋顶
// 门
// 灌木丛
// 墓碑
// 雾气
// 纹理
const fog = new THREE.Fog(0x262837, 1, 12);
scene.fog = fog;

const loader = new THREE.TextureLoader();
const doorColorTexture = loader.load("/textures/door/color.jpg");
const doorAmbientOcclusionTexture = loader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorAlphaTexture = loader.load("/textures/door/alpha.jpg");
const doorHeightTexture = loader.load("/textures/door/height.jpg");
const doormetalnessTexture = loader.load("/textures/door/metalness.jpg");
const doornormalTexture = loader.load("/textures/door/normal.jpg");
const doorRoughnessTexture = loader.load("/textures/door/roughness.jpg");

const grassColorTexture = loader.load("/textures/grass/color.jpg");
const grassAmbientOcclusionTexture = loader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
const grassNormalTexture = loader.load("/textures/grass/normal.jpg");
const grassRoughnessTexture = loader.load("/textures/grass/roughness.jpg");
grassColorTexture.wrapS = THREE.RepeatWrapping;
grassColorTexture.wrapT = THREE.RepeatWrapping;
grassColorTexture.repeat.set(8, 8);

grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.repeat.set(8, 8);

grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.repeat.set(8, 8);

grassRoughnessTexture.repeat.set(8, 8);
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

const bricksColorTexture = loader.load("/textures/bricks/color.jpg");
const bricksAmbientOcclusionTexture = loader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);
const bricksNormalTexture = loader.load("/textures/bricks/normal.jpg");
const bricksRoughnessTexture = loader.load("/textures/bricks/roughness.jpg");

const planeMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
);
// planeMesh.geometry.center();
planeMesh.rotation.x = -Math.PI * 0.5;
planeMesh.position.y = 0;
planeMesh.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(planeMesh.geometry.attributes.uv.array, 2)
);
planeMesh.receiveShadow = true;
scene.add(planeMesh);

const house = new THREE.Group();
scene.add(house);

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
);
walls.position.set(0, 1.25, 0);
copynv2(walls);
house.add(walls);

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: 0xb35f45 })
);
roof.position.set(0, 3, 0);
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2, 50, 50),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    normalMap: doornormalTexture,
    metalnessMap: doormetalnessTexture,
    roughnessMap: doorRoughnessTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.15,
  })
);
door.position.set(0, 1, 2.01);
copynv2(door);
house.add(door);

const brushGeomerey = new THREE.SphereGeometry(1, 16, 16);
const brushMaterial = new THREE.MeshStandardMaterial({ color: 0x89c854 });
const brush1 = new THREE.Mesh(brushGeomerey, brushMaterial);
brush1.scale.set(0.7, 0.7, 0.7);
brush1.position.set(1, 0.5, 3);
brush1.castShadow = true;
house.add(brush1);
const brush2 = new THREE.Mesh(brushGeomerey, brushMaterial);
brush2.scale.set(0.3, 0.3, 0.3);
brush2.position.set(1.8, 0.2, 3.3);
brush2.castShadow = true;
house.add(brush2);
const brush3 = new THREE.Mesh(brushGeomerey, brushMaterial);
brush3.scale.set(0.6, 0.6, 0.6);
brush3.position.set(-1, 0.45, 3.3);
brush3.castShadow = true;
house.add(brush3);
const brush4 = new THREE.Mesh(brushGeomerey, brushMaterial);
brush4.scale.set(0.4, 0.4, 0.4);
brush4.position.set(-1.8, 0.45, 3);
brush4.castShadow = true;
house.add(brush4);

const graves = new THREE.Group();
scene.add(graves);
const graveGemory = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: 0xb2b6b1 });
for (let i = 0; i < 50; i++) {
  const grave = new THREE.Mesh(graveGemory, graveMaterial);
  const angle = Math.random() * Math.PI * 2;
  const x = Math.sin(angle) * (5 + Math.random() * 3);
  const z = Math.cos(angle) * (5 + Math.random() * 3);
  grave.position.set(x, 0.3, z);
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.6;
  grave.castShadow = true;
  graves.add(grave);
}

// add light
const ambientLight = new THREE.AmbientLight(0xb9d5ff, 0.12);
scene.add(ambientLight);

const directLight = new THREE.DirectionalLight(0xb9d5ff, 0.12);
directLight.position.set(4, 6, -2);
scene.add(directLight);
directLight.castShadow = true;
directLight.shadow.mapSize.set(256, 256);
directLight.shadow.camera.far = 15;

const doorLight = new THREE.PointLight(0xff7d46, 1, 7);
doorLight.position.set(0, 2.2, 2.7);
doorLight.castShadow = true;
doorLight.shadow.mapSize.set(256, 256);
doorLight.shadow.camera.far = 15;
scene.add(doorLight);

const ghost1 = new THREE.PointLight(0xff00ff, 2, 3);
ghost1.castShadow = true;
ghost1.shadow.mapSize.set(256, 256);
ghost1.shadow.camera.far = 15;
scene.add(ghost1);

const ghost2 = new THREE.PointLight(0x00ffff, 2, 3);
ghost2.castShadow = true;
ghost2.shadow.mapSize.set(256, 256);
ghost2.shadow.camera.far = 15;
scene.add(ghost2);

const ghost3 = new THREE.PointLight(0xffff00, 2, 3);
ghost3.castShadow = true;
ghost3.shadow.mapSize.set(256, 256);
ghost3.shadow.camera.far = 15;
scene.add(ghost3);

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
camera.position.y = 13;
camera.position.z = 20;
scene.add(camera);
gsap.to(camera.position, { duration: 5, y: 3 });
gsap.to(camera.position, { duration: 5, z: 6 });

// const axiesHelper = new THREE.AxesHelper();
// scene.add(axiesHelper);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(size.width, size.height);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0x262837);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const clock = new THREE.Clock();

function tick() {
  const elapsedTime = clock.getElapsedTime();

  const angle1 = elapsedTime * 0.5;
  ghost1.position.x = Math.sin(angle1) * 4;
  ghost1.position.z = Math.cos(angle1) * 4;
  ghost1.position.y = Math.cos(elapsedTime * 3);

  const angle2 = elapsedTime * 0.3;
  ghost2.position.x = Math.sin(angle2) * 5;
  ghost2.position.z = Math.cos(angle2) * 5;
  ghost2.position.y = Math.cos(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  const angle3 = elapsedTime * 0.3;
  ghost3.position.x = Math.cos(angle3) * (7 + Math.sin(elapsedTime * 0.32));
  ghost3.position.z = Math.sin(angle3) * (7 + Math.sin(elapsedTime * 0.5));
  ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();

function copynv2(mesh) {
  mesh.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(mesh.geometry.attributes.uv.array, 2)
  );
}
