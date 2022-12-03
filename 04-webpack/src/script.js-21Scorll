import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

const gui = new dat.GUI();
const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

// scroll alpha
// mesh
// gui color
const params = {};

params.count = 200;
// params.size = 0.02
params.color = "#FB7299";
params.fullHeight = 4;
params.currentSection = 0;
params.oldSection = 0;
params.scrollY = 0

gui.addColor(params, "color").onChange(() => {
  material.color.set(params.color);
  pointsMaterial.color.set(params.color);
});

const loader = new THREE.TextureLoader();
const alphaTexture = loader.load("/textures/gradients/5.jpg");
alphaTexture.magFilter = THREE.NearestFilter;

const material = new THREE.MeshToonMaterial({
  color: params.color,
  gradientMap: alphaTexture,
});
const mesh1 = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 60), material);

const mesh2 = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), material);

const mesh3 = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1, 0.35, 100, 16),
  material
);
mesh2.position.y = -params.fullHeight;
mesh3.position.y = -params.fullHeight * 2;

mesh1.position.x = 2
mesh2.position.x = -2
mesh3.position.x = 2

scene.add(mesh1, mesh2, mesh3);
const meshes = [mesh1, mesh2, mesh3];

const pointsGeometry = new THREE.BufferGeometry();
const pointsMaterial = new THREE.PointsMaterial({
  size: 0.03,
  color: params.color,
});

const positions = new Float32Array(params.count * 3);

for (let i = 0; i < params.count; i++) {
  let i3 = i * 3;
  positions[i3] = THREE.MathUtils.randFloatSpread(10);
  positions[i3 + 1] = THREE.MathUtils.randFloatSpread(
    params.fullHeight * meshes.length
  );
  positions[i3 + 2] = THREE.MathUtils.randFloatSpread(10);
}
pointsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
const points = new THREE.Points(pointsGeometry, pointsMaterial)
scene.add(points)

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 0);
scene.add(light);


const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const mouse = {};
mouse.x = 0;
mouse.y = 0;

window.addEventListener("scroll", () => {
  params.scrollY = window.scrollY
  params.currentSection = Math.round(window.scrollY / size.height)
});

window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX / size.width - 0.5;
  mouse.y = event.clientY / size.height - 0.5;
});

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
});

const camera = new THREE.PerspectiveCamera(
  35,
  size.width / size.height,
  0.1,
  100
);

const cameraGroup = new THREE.Group();
scene.add(cameraGroup);
camera.position.set(0, 0, 6);
cameraGroup.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(size.width, size.height);
// renderer.setClearAlpha(0)

// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

const clock = new THREE.Clock();
let lastTime = 0;

function tick() {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - lastTime;
  lastTime = elapsedTime;

  for (const mesh of meshes) {
    mesh.rotation.x += deltaTime * 0.5;
    mesh.rotation.y += deltaTime * 0.5;
  }

  const parallaxX = mouse.x;
  const parallaxY = -mouse.y;

  cameraGroup.position.x +=
    (parallaxX - cameraGroup.position.x) * 2.5 * deltaTime;
  cameraGroup.position.y +=
    (parallaxY - cameraGroup.position.y) * 2.5 * deltaTime;
  camera.position.y = -params.scrollY / size.height * params.fullHeight;

  if(params.currentSection != params.oldSection){
    params.oldSection = params.currentSection
    gsap.to(meshes[params.currentSection].rotation, {
      duration: 1.5,
      ease: "power2.inOut",
      x:"+=6",
      y:"+=3",
      z:"+=1.5"
    })
  }

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();
