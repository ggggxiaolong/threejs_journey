import { Experience } from "../experience";
import * as THREE from "three";

export class Environment {
  constructor() {
    this.experience = new Experience();
    this.resource = this.experience.resource;
    this.scene = this.experience.scene;
    this.initLight();
  }

  initLight() {
    this.sunLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(this.sunLight);
    this.directLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directLight.position.set(4, 2, 3);
    this.directLight.shadow.camera.far = 9;
    this.directLight.shadow.camera.top = 4;
    this.directLight.shadow.camera.bottom = -2;
    this.directLight.castShadow = true;
    // const cameraHelper = new THREE.CameraHelper(this.directLight.shadow.camera);
    // this.scene.add(cameraHelper);
    this.scene.add(this.directLight);
    // this.scene.environment = this.resource.items["environmentMapTexture"]
  }
}
