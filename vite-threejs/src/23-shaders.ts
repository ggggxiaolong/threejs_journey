import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water";
import { Sky } from "three/examples/jsm/objects/Sky";
import { Size } from "./model";
import { Util } from "./utils";

const size = Size.getInstance();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, size.aspect, 1, 20000);
const renderer = Util.initRenderer(size);
const loader = new THREE.TextureLoader();

init();
render();

function init() {
  camera.position.set(30, 30, 100);
  Util.addAxesHelper(scene, 20);
  size.onResize(function () {
    Util.onResize(size, camera, renderer);
  });

  const water = new Water(new THREE.PlaneGeometry(10000, 10000),{
    waterNormals: loader.load("")
  })
}

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
