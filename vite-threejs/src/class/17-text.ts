import {
  AmbientLight,
  DirectionalLight,
  Fog,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PlaneGeometry,
  Scene,
} from "three";
import { Size } from "./model";
import { Util } from "./utils";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

const size = Size.getInstance();
const scene = new Scene();
const camera = Util.initCamera(size);
const renderer = Util.initRenderer(size);
const control = Util.initControl(camera, renderer);

init();
render();

function init() {
  camera.position.set(0, 250, 500);
  size.onResize(function () {
    Util.onResize(size, camera, renderer);
  });
//   Util.addAxesHelper(scene, 100);
  const envLight = new AmbientLight(0xffffff, 0.3);
  scene.add(envLight);
  const directLight = new DirectionalLight(0xffffff, 1);
  directLight.position.set(0, 100, 50);
  directLight.color.setHSL(Math.random(), 1, 0.5);
  scene.add(directLight);

  const floor = new Mesh(
    new PlaneGeometry(10000, 10000),
    new MeshBasicMaterial({
        color: 0xffffff, 
        opacity: 0.5,
        transparent: true,
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0, -4500);
  scene.add(floor);
  scene.fog = new Fog(0x000000, 250, 1000);

  const fontLoader = new FontLoader();
  fontLoader.load("./fonts/helvetiker_regular.typeface.json", function (font) {
    const geometry = new TextGeometry("Three.js", {
      font: font,
      size: 50,
      height: 20,
      bevelEnabled: true,
      bevelSize: 1.5,
      curveSegments: 4,
      bevelThickness: 2,
    });
    geometry.computeBoundingBox();
    const offsetX = (geometry.boundingBox!!.max.x - geometry.boundingBox!!.min.x) / 2;
    const material = [
      new MeshPhongMaterial({ color: 0xffffff, flatShading: true }),
      new MeshPhongMaterial({ color: 0xffffff }),
    ];
    const mesh = new Mesh(geometry, material);
    mesh.position.set(-offsetX, 30, -10);
    scene.add(mesh);
    const shadowMesh = new Mesh(geometry, material);
    shadowMesh.position.set(-offsetX, -20, 10);
    shadowMesh.rotation.x = Math.PI;
    scene.add(shadowMesh);
  });
}

function render() {
  renderer.render(scene, camera);
  control.update();
  requestAnimationFrame(render);
}
