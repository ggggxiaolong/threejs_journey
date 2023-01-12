import * as THREE from "three";
import { Size } from "./model";
import { Util } from "./utils";

const size = Size.getInstance()
const scene = new THREE.Scene();
const camera = Util.initCamera(size, 90, 100);
const renderer = Util.initRenderer(size);
const control = Util.initControl(camera, renderer);
const loader = new THREE.ImageLoader();

//textures/cube/sun_temple_stripe.jpg

init();

render();

function init() {
    // camera.position.set(0, 2, 2);
    camera.position.set(0, 0, 0.01);
    control.enablePan = false;
    control.enableZoom = false;
    control.rotateSpeed = - 0.25;
    // renderer.outputEncoding = THREE.sRGBEncoding;
    // Util.addAxesHelper(scene, 0.3);
    size.onResize(() => {
        Util.onResize(size, camera, renderer);
    })

    // const box = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({color: 0xffffff,wireframe: true}));
    // box.geometry.scale(1, 1, -1);
    // scene.add(box);

    loader.load("textures/cube/sun_temple_stripe.jpg", (image) => {
        const materials: Array<THREE.MeshBasicMaterial> = new Array();
        const clipWidth = image.height;
        for (let i = 0; i < 6; i++) {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d")!!;
            canvas.height = clipWidth;
            canvas.width = clipWidth;
            //image, x偏移， y偏移， 截取图片长， 截取图片宽， padding canvas X, padding canvas Y， 显示长（可以缩放），显示宽（可以缩放） 
            context.drawImage(image, clipWidth * i, 0, clipWidth, clipWidth, 0, 0, clipWidth, clipWidth);
            const texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;
            materials.push(new THREE.MeshBasicMaterial({map:texture}));
        }

        const sky = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), materials);
        // 让贴图去内部空间
        sky.geometry.scale(1,1,-1);
        scene.add(sky);
    })
}

function render() {
    renderer.render(scene, camera);
    control.update()
    requestAnimationFrame(render);
}