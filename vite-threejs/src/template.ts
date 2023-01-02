import * as THREE from "three";
import { Size } from "./model";
import { Util } from "./utils";

const size = Size.getInstance();
const scene = new THREE.Scene();
const camera = Util.initCamera(size);
const renderer = Util.initRenderer(size);
const control = Util.initControl(camera, renderer);

init();
render();

function init() {
    camera.position.set(0, 2, 2);
    Util.addAxeisHelper(scene, 1)
    size.onResise(function(){
        Util.onResize(size, camera, renderer);
    })
}

function render() {
    renderer.render(scene, camera);
    control.update()
    requestAnimationFrame(render)
}
