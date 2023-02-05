import * as THREE from "three";
import { IUniform } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass";
import { Size } from "./model";
import { Util } from "./utils";

const size = Size.getInstance();
const scene = new THREE.Scene();
const camera = Util.initCamera(size);
const renderer = Util.initRenderer(size);
const control = Util.initControl(camera, renderer);
let uniform: { [uniform: string]: IUniform };
const clock = new THREE.Clock();
let mesh: THREE.Mesh;
const composer = new EffectComposer(renderer);

init();
render();

function init() {
  camera.position.set(0, 0, 3);
  //   Util.addAxesHelper(scene, 1);
  //   composer.setSize(size.width, size.height);
  size.onResize(function () {
    Util.onResize(size, camera, renderer);
    composer.setSize(size.width, size.height);
  });
  const textureLoader = new THREE.TextureLoader();
  const texture1 = textureLoader.load("textures/lava/cloud.png");
  const texture2 = textureLoader.load("textures/lava/lavatile.jpg");
  texture1.wrapS = THREE.RepeatWrapping;
  texture1.wrapT = THREE.RepeatWrapping;
  texture2.wrapS = THREE.RepeatWrapping;
  texture2.wrapT = THREE.RepeatWrapping;
  uniform = {
    fogDensity: { value: 0.45 },
    fogColor: { value: new THREE.Vector3(0, 0, 0) },
    time: { value: 1.0 },
    uvScale: { value: new THREE.Vector2(3.0, 1.0) },
    texture1: { value: texture1 },
    texture2: { value: texture2 },
  };
  const geometry = new THREE.TorusGeometry(0.65, 0.3, 30, 30);
  const material = new THREE.ShaderMaterial({
    uniforms: uniform,
    vertexShader: `
        varying vec2 vUv;
        uniform vec2 uvScale;
        void main(){
            vUv = uvScale * uv;
            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
			gl_Position = projectionMatrix * mvPosition;
        }
    `,
    fragmentShader: `
        uniform float time;
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        uniform float fogDensity;
		uniform vec3 fogColor;
        varying vec2 vUv;
        void main(){
            vec2 position = - 1.0 + 2.0 * vUv;

            vec4 noise = texture2D( texture1, vUv );
            vec2 T1 = vUv + vec2( 1.5, - 1.5 ) * time * 0.02;
            vec2 T2 = vUv + vec2( - 0.5, 2.0 ) * time * 0.01;

            T1.x += noise.x * 2.0;
            T1.y += noise.y * 2.0;
            T2.x -= noise.y * 0.2;
            T2.y += noise.z * 0.2;

            float p = texture2D( texture1, T1 * 2.0 ).a;

            vec4 color = texture2D( texture2, T2 * 2.0 );
            vec4 temp = color * ( vec4( p, p, p, p ) * 2.0 ) + ( color * color - 0.1 );

            if( temp.r > 1.0 ) { temp.bg += clamp( temp.r - 2.0, 0.0, 100.0 ); }
            if( temp.g > 1.0 ) { temp.rb += temp.g - 1.0; }
            if( temp.b > 1.0 ) { temp.rg += temp.b - 1.0; }

            gl_FragColor = temp;

            float depth = gl_FragCoord.z / gl_FragCoord.w;
            const float LOG2 = 1.442695;
            float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );
            fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );

            gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );
        }
    `,
  });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer.autoClear = false;
  const renderModel = new RenderPass(scene, camera);
  const effectBloom = new BloomPass(1.25);
  const effectFilm = new FilmPass(0.35, 0.95, 2048, 0);
  composer.addPass(renderModel);
  composer.addPass(effectBloom);
  composer.addPass(effectFilm);
}

function render() {
  const time = clock.getElapsedTime();
  uniform.time.value = time;
  mesh.rotation.y = 0.125 * time;
  mesh.rotation.x = 0.05 * time;

  renderer.render(scene, camera);
  renderer.clear();
  composer.render(clock.getDelta());
  control.update();

  requestAnimationFrame(render);
}
