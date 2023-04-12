import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { Size, Mouse } from "./model";
import { Util } from "./utils";
import { GUI } from "lil-gui";

const size = Size.getInstance();
const scene = new THREE.Scene();
const renderer = Util.initRenderer(size);
const camera = new THREE.PerspectiveCamera(55, size.aspect, 2, 2000);
const stats = new Stats();
let material: THREE.PointsMaterial;
const clock = new THREE.Clock();
const gui = new GUI();
const mouse = Mouse.getInstance();

init();
render();

function init() {
  document.body.appendChild(stats.dom);
  camera.position.set(0, 0, 1000);
  mouse.updateOffset(size.width / 2, size.height / 2);
  //   Util.addAxesHelper(scene, 100);
  size.onResize(() => {
    Util.onResize(size, camera, renderer);
  });

  const pointCount = 1000;
  const positions: Array<number> = new Array();
  for (let i = 0; i < pointCount; i++) {
    const x = 2000 * Math.random() - 1000;
    const y = 2000 * Math.random() - 1000;
    const z = 2000 * Math.random() - 1000;
    positions.push(x, y, z);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  const texture = new THREE.TextureLoader().load("textures/sprites/disc.png");
  material = new THREE.PointsMaterial({
    size: 35,
    map: texture,
    sizeAttenuation: true,
    alphaTest: 0.5,
    transparent: true,
  });
  material.color.setHSL(1.0, 0.3, 0.7);
  gui.add(material, "sizeAttenuation").onChange(() => {
    material.needsUpdate = true;
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);
}

function render() {
  const elapsedTime = clock.getElapsedTime() * 20;
  renderer.render(scene, camera);
  stats.update();
  const h = (elapsedTime % 360) / 360;
  material.color.setHSL(h, 0.5, 0.5);
  camera.position.x += (mouse.x - camera.position.x) * 0.05;
  camera.position.y += (-mouse.y - camera.position.y) * 0.05;
  
  camera.lookAt(scene.position);
  requestAnimationFrame(render);
}
