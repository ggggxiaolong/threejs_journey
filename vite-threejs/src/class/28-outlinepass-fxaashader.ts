import * as THREE from "three";
import { Size, Mouse } from "./model";
import { Util } from "./utils";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
// import { GUI } from 'lil-gui';

const size = Size.getInstance();
const mouse = Mouse.getInstance();
const scene = new THREE.Scene();
const camera = Util.initCamera(size);
const renderer = Util.initRenderer(size);
const control = Util.initControl(camera, renderer);
const composer: EffectComposer = new EffectComposer(renderer);
let outlinePass: OutlinePass;
const raycaster = new THREE.Raycaster();
const effectFXAA = new ShaderPass(FXAAShader);
// const gui = new GUI();

init();
render();

function init() {
    camera.position.set(0, 1, 4);
    // Util.addAxesHelper(scene, 1)
    size.onResize(function () {
        Util.onResize(size, camera, renderer);
        composer.setSize(size.width, size.height);
        effectFXAA.uniforms['resolution'].value.set(1 / size.width, 1 / size.height);
    })
    composer.setSize(size.width, size.height);

    mouse.setOnChange(function () {
        raycaster.setFromCamera({ x: (mouse.x / size.width) * 2 - 1, y: 1 - (mouse.y / size.height) * 2 }, camera);
        const objs = raycaster.intersectObject(scene, true);
        if (objs.length > 0) {
            outlinePass.selectedObjects = [objs[0].object];
        } else {
            outlinePass.selectedObjects = [];
        }
    })

    renderer.shadowMap.enabled = true;
    const envLight = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(envLight);
    const directLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directLight.position.set(1, 1, 1);
    directLight.castShadow = true;
    directLight.shadow.mapSize.set(1024, 1024);
    scene.add(directLight);

    const plain = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), new THREE.MeshStandardMaterial({ color: 0xddffdd, side: THREE.DoubleSide }));
    plain.rotation.x = -Math.PI / 2;
    plain.position.set(0, -0.51, 0);
    plain.receiveShadow = true;
    scene.add(plain);

    const objLoader = new OBJLoader();
    objLoader.load("models/tree.obj", function (mesh) {
        mesh.position.set(0, -0.5, 0);
        const material = new THREE.MeshPhongMaterial({ color: 0xddffdd });
        mesh.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = material;
                child.castShadow = true;
            }
        })
        scene.add(mesh);
    })

    const material = new THREE.MeshPhongMaterial();
    const geometry = new THREE.SphereGeometry(0.5, 32, 16);
    const count = 15;
    for (let i = 0; i < count; i++) {
        const scale = THREE.MathUtils.randFloat(0.2, 0.7);
        material.color.setHSL(Math.random(), 1.0, 0.5);
        const ball = new THREE.Mesh(geometry, material.clone());
        ball.scale.set(scale, scale, scale);
        ball.position.set(THREE.MathUtils.randFloat(-0.9, 0.9),
            THREE.MathUtils.randFloat(-0.2, 0.5),
            THREE.MathUtils.randFloat(-1.4, 0.9),);
        ball.castShadow = true;
        scene.add(ball);
    }

    const torus = new THREE.Mesh(
        new THREE.TorusGeometry(0.4, 0.15, 16, 80),
        new THREE.MeshPhongMaterial({ color: 0xffaaff })
    );
    torus.position.set(1, 0, -1);
    scene.add(torus);

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    outlinePass = new OutlinePass(new THREE.Vector2(size.width, size.height), scene, camera);
    composer.addPass(outlinePass);
    composer.addPass(effectFXAA);

}

function render() {
    // renderer.render(scene, camera);
    composer.render()
    control.update()
    requestAnimationFrame(render)
}
