import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import EventEmitter from "./eventEmitter";

export class Resource extends EventEmitter {
  constructor(source) {
    super();
    this.source = source;
    this.toLoad = this.source.length;
    this.loaded = 0;
    this.items = {};
    this.initLoader();
    this.loadSource();
  }

  initLoader() {
    this.textureLoader = new THREE.TextureLoader();
    this.cubeLoader = new THREE.CubeTextureLoader();
    this.gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/libs/draco/");
    this.gltfLoader.setDRACOLoader(dracoLoader);
  }

  loadSource() {
    for (const item of this.source) {
      const itemType = item.type;
      switch (itemType) {
        case "cubeTexture":
            this.cubeLoader.load(item.path, (texture)=> {
                this.onLoaded(item.name, texture)
            });
          break;
        case "texture":
            this.textureLoader.load(item.path, (texture)=> {
                this.onLoaded(item.name, texture)
            });
          break;
        case "gltfModel":
            this.gltfLoader.load(item.path, (texture)=> {
                this.onLoaded(item.name, texture)
            });
          break;
        default:
            console.error(`not support texture type ${itemType}`)
            break;
      }
    }
  }

  onLoaded(name, texture){
    this.loaded += 1;
    this.items[name] = texture;
    if (this.loaded === this.toLoad){
        this.trigger("ready")
    }
  }
}
