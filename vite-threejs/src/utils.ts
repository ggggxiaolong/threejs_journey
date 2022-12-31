import { Size } from "./model";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export namespace Util {
  export function onResize(
    size: Size,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer
  ) {
    camera.aspect = size.aspect;
    camera.updateProjectionMatrix();
    renderer.setSize(size.width, size.height);
  }

  export function initRenderer(size: Size): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(size.pixelRatio);
    document.body.appendChild(renderer.domElement)
    return renderer;
  }

  export function initCamera(
    size: Size,
    fov: number = 50
  ): THREE.PerspectiveCamera {
    return new THREE.PerspectiveCamera(fov, size.aspect, 0.1, 100);
  }

  export function addAxeisHelper(
    scene: THREE.Scene,
    size: number = 1
  ): THREE.AxesHelper {
    const helper = new THREE.AxesHelper(size);
    scene.add(helper);
    return helper;
  }

  export function initControl(
    camera: THREE.Camera,
    renderer: THREE.WebGLRenderer
  ): OrbitControls {
    const control =  new OrbitControls(camera, renderer.domElement);
    control.enableDamping = true;
    return control
  }
}
