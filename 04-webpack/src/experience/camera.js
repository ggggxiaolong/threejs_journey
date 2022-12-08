import { Experience } from "./experience";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class Camera {
  constructor() {
    this.experience = new Experience();
    this.size = this.experience.size;
    this.scene = this.experience.scene;
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.size.width / this.size.height,
      0.1,
      100
    );
    this.instance.position.set(5, 6, 15);
    this.scene.add(this.instance);
    this.initControl()
  }

  resize() {
    this.instance.aspect = this.size.width / this.size.height;
    this.instance.updateProjectionMatrix();
  }

  initControl(){
    this.control = new OrbitControls(this.instance, this.experience.canvas)
    this.control.enableDamping = true

  }

  update(){
    this.control.update()
  }
}
