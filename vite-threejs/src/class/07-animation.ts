import * as THREE from "three";
import { Size } from "./model";
import { Util } from "./utils";

let scene: THREE.Scene;
let cube: THREE.Mesh;
let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;
let mixer: THREE.AnimationMixer;
const size = Size.getInstance();
const clock = new THREE.Clock();

init();
initMixer();
render();

function init() {
  scene = new THREE.Scene();
  camera = Util.initCamera(size);
  camera.position.set(5, 25, 25);
  Util.addAxesHelper(scene, 10);
  renderer = Util.initRenderer(size);
  Util.initControl(camera, renderer);
  size.onResize(function () {
    Util.onResize(size, camera, renderer);
  });

  cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true })
  );
  scene.add(cube);
}

function initMixer(){
    const positionKF = new THREE.VectorKeyframeTrack(
        ".position",
        [0,1,2,3],
        [
            0,0,0,
            10,0,0,
            10,10, 0,
            0,0,0
        ]
    );
    const scaleKF = new THREE.VectorKeyframeTrack(
        ".scale",
        [0,1,2,3],
        [
          1,1,1,
          2,2,2,
          1,2,2,
          1,1,1  
        ]
    )

    const first = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0), 0);
    const second = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0), Math.PI);
    const third = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0), Math.PI);
    const end = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,1,0), 0);

    const rotationKF = new THREE.QuaternionKeyframeTrack(
        ".quaternion",
        [0,1,2,3],
        [
            first.x, first.y, first.z, first.w,
            second.x, second.y, second.z, second.w,
            third.x, third.y, third.z, third.w,
            end.x, end.y, end.z, end.w
        ]
    )

    const colorKF = new THREE.ColorKeyframeTrack(
        ".material.color",
        [0,1,2,3],
        [
           1,0,0,
           0,1,0,
           0,0,1,
           1,0,0 
        ]
    )

    const alphaKF = new THREE.NumberKeyframeTrack(
        ".material.opacity",
        [0,1,2,3],
        [
            1,0.75,0.5,1
        ]
    );
    const animation = new THREE.AnimationClip(
        "action",
        3.2,
        [positionKF, scaleKF, rotationKF, colorKF, alphaKF]
    );

    mixer = new THREE.AnimationMixer(cube)
    mixer.clipAction(animation).play()
}

function render() {
  renderer.render(scene, camera);
  mixer.update(clock.getDelta())
  requestAnimationFrame(render);
}
