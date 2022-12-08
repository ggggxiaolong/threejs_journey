import * as THREE from "three";
import { Experience } from "../experience";

export class TestMesh {
  constructor() {
    this.experience = new Experience();
    this.resource = this.experience.resource;
    this.geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    this.material = new THREE.MeshStandardMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.experience.scene.add(this.mesh);
  }
}
