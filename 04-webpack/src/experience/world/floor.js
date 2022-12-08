import { Experience } from "../experience";
import * as THREE from "three";

export class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resource = this.experience.resource;
    this.geometry = new THREE.CircleGeometry(4, 100);
    this.material = new THREE.MeshStandardMaterial({
      map: this.resource.items["floorColor"],
      normalMap: this.resource.items["floorNormal"],
    });
    this.material.map.repeat.set(2, 2);
    this.material.map.wrapS = THREE.RepeatWrapping;
    this.material.map.wrapT = THREE.RepeatWrapping;
    this.material.normalMap.repeat.set(2, 2);
    this.material.normalMap.wrapS = THREE.RepeatWrapping;
    this.material.normalMap.wrapT = THREE.RepeatWrapping;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
}
