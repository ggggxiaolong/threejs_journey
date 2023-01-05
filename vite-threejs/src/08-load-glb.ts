import * as THREE from "three";
import { Size } from "./model";
import { Util } from "./utils";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { GUI } from "lil-gui";

const size = Size.getInstance();
const scene = new THREE.Scene();
const renderer = Util.initRenderer(size);
const camera = Util.initCamera(size);
const control = Util.initControl(camera, renderer);
const loader = new GLTFLoader();
const clock = new THREE.Clock();
const gui = new GUI();
let mixer: THREE.AnimationMixer | null = null;

init();
render();

function init() {
  camera.position.set(-1, 1, 4);
  // Util.addAxeisHelper(scene);
  size.onResize(function () {
    Util.onResize(size, camera, renderer);
  });
  const envLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(envLight);
  const dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.set(0, 10, 20);
  scene.add(dirLight);
  gui.add(camera.position, "x", -100, 100);
  gui.add(camera.position, "y", -100, 100);
  gui.add(camera.position, "z", -100, 100);
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -1, 0);
  scene.add(floor);

  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  dirLight.castShadow = true;
  dirLight.shadow.camera.near = 21;
  dirLight.shadow.camera.far = 27;
  dirLight.shadow.camera.right = 1;
  dirLight.shadow.camera.left = -1;
  dirLight.shadow.camera.top = 1;
  dirLight.shadow.camera.bottom = -1;
  dirLight.shadow.mapSize.set(1024, 1024);
  floor.receiveShadow = true;

  //   const camerHelper = new THREE.CameraHelper(dirLight.shadow.camera);
  //   scene.add(camerHelper);

  loader.load("/models/Soldier.glb", function (model: GLTF) {
    model.scene.rotation.y = Math.PI;
    model.scene.position.set(0, -1, 0);
    const animation = model.animations[1];
    mixer = new THREE.AnimationMixer(model.scene);
    const animate = mixer.clipAction(animation);
    animate.play();
    scene.add(model.scene);
    model.scene.traverse(function (obj) {
      if (
        obj instanceof THREE.Mesh &&
        obj.material instanceof THREE.MeshStandardMaterial
      ) {
        obj.castShadow = true;
      }
    });
  });
}

function render() {
  renderer.render(scene, camera);
  control.update();
  mixer?.update(clock.getDelta());
  requestAnimationFrame(render);
}
