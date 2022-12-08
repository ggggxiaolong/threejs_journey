import { Camera } from "./camera";
import { Size } from "./utils/size";
import { Time } from "./utils/time";
import * as THREE from "three";
import { Render } from "./render";
import { World } from "./world/world";
import { Resource } from "./utils/resource";
import source from "./source";
import { Debug } from "./utils/debug";

var instance = null;

export class Experience {
  constructor(canvas) {
    if (instance) {
      return instance;
    }
    instance = this;
    this.size = new Size();
    this.time = new Time();
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.render = new Render();
    this.resource = new Resource(source);
    this.world = new World();
    this.debug = new Debug();

    this.size.on("resize", () => {
      this.resize();
    });
    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.render.resize();
    this.camera.resize();
  }

  update() {
    this.render.update();
    this.world.update();
  }
}
