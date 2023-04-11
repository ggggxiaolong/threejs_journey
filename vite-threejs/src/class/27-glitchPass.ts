import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { Size } from "./model";
import { Util } from "./utils";

const size = Size.getInstance();
const scene = new THREE.Scene();
const camera = Util.initCamera(size);
const renderer = Util.initRenderer(size);
const control = Util.initControl(camera, renderer);
const composer = new EffectComposer(renderer);
let mesh: THREE.InstancedMesh

init();
render();

function init() {
  camera.position.set(0, 0, 250);
//   Util.addAxesHelper(scene, 1);
  size.onResize(function () {
    Util.onResize(size, camera, renderer);
  });

  const envLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(envLight);
  const directLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directLight.position.set(1, 1, 1);
  scene.add(directLight);

  const group = new THREE.Object3D();
  scene.add(group);
  const geometry = new THREE.SphereGeometry(1, 5, 4);
  const material = new THREE.MeshPhongMaterial();
  const count = 100;
  const color = new THREE.Color(0xffffff);
  mesh = new THREE.InstancedMesh(geometry, material, count);
  const position = new THREE.Matrix4();
  for (let i = 0; i < count; i++) {
    position.identity();
    const scale = THREE.MathUtils.randFloat(1, 10);
    position.makeScale(scale, scale, scale);
    position.setPosition(
      THREE.MathUtils.randFloat(-80, 80),
      THREE.MathUtils.randFloat(-80, 80),
      THREE.MathUtils.randFloat(-80, 80)
    );
    mesh.setMatrixAt(i, position);
    color.set(0xffffff * Math.random());
    mesh.setColorAt(i, color);
  }
  scene.add(mesh);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new GlitchPass(62));
}

function render() {
  mesh.rotation.x += 0.005;
  mesh.rotation.y += 0.01;
  composer.render();
  control.update();
  requestAnimationFrame(render);
}
