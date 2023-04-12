import * as THREE from "three";
import { Size } from "./model";
import { Util } from "./utils";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils";
import { BufferGeometry } from "three";

const size = Size.getInstance();
const scene = new THREE.Scene();
const camera = Util.initCamera(size);
const renderer = Util.initRenderer(size);
const control = Util.initControl(camera, renderer);
const PARTICLE_SIZE = 20;
const rayCaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(0, 0);
let geometry: BufferGeometry;
let points: THREE.Points;
let selectPoint: number| undefined = undefined

init();
render();

function init() {
  camera.position.set(0, 0, 250);
  //   Util.addAxesHelper(scene, 50);
  size.onResize(function () {
    Util.onResize(size, camera, renderer);
  });

  let boxGeometry = new THREE.BoxGeometry(200, 200, 200, 16, 16, 16);
  boxGeometry.deleteAttribute("normal");
  boxGeometry.deleteAttribute("uv");
  geometry = BufferGeometryUtils.mergeVertices(boxGeometry);
  //   const geometry = new THREE.BufferGeometry()
  const colors: Array<number> = [];
  const particleSize: Array<number> = [];
  const color = new THREE.Color();
  const positionAttribute = geometry.getAttribute("position")!!;
  for (let i = 0; i < positionAttribute.count; i++) {
    color.setHSL(0.01 + 0.1 * (i / positionAttribute.count), 1.0, 0.5);
    color.toArray(colors, i * 3);
    particleSize[i] = PARTICLE_SIZE * 0.5;
  }
  //   geometry.setAttribute("position", positionAttribute);
  geometry.setAttribute(
    "customColor",
    new THREE.Float32BufferAttribute(colors, 3)
  );
  geometry.setAttribute(
    "size",
    new THREE.Float32BufferAttribute(particleSize, 1)
  );
  //   console.log(geometry);
  const material = new THREE.ShaderMaterial({
    vertexShader: `
        attribute float size;
        attribute vec3 customColor;
        varying vec3 vColor;

        void main(){
            vColor = customColor;
            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0);
            gl_PointSize = size ;
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
    fragmentShader: `
        uniform vec3 color;
        uniform sampler2D pointTexture;
        varying vec3 vColor;
        void main(){
            gl_FragColor = vec4(color * vColor, 1.0);
            gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
            if (gl_FragColor.a < 0.9) discard;
        }
    `,
    uniforms: {
      color: { value: new THREE.Color(0xffffff) },
      pointTexture: {
        value: new THREE.TextureLoader().load("./textures/sprites/disc.png"),
      },
    },
  });

  points = new THREE.Points(geometry, material);
  scene.add(points);
}

function render() {
  points.rotation.x += 0.0005;
  points.rotation.y += 0.001;
  rayCaster.setFromCamera(mouse, camera);
  const intersections = rayCaster.intersectObject(points);
  if (intersections.length > 0){
    if (selectPoint != intersections[0].index){
        selectPoint = intersections[0].index;
        (geometry.getAttribute("size") as THREE.BufferAttribute).setX(selectPoint!!,PARTICLE_SIZE * 1.25);
        geometry.getAttribute("size").needsUpdate = true;
    }
  } else if(selectPoint){
    (geometry.getAttribute("size") as THREE.BufferAttribute).setX(selectPoint,PARTICLE_SIZE);
    geometry.getAttribute("size").needsUpdate = true;
    selectPoint = undefined;
  }
  renderer.render(scene, camera);
  control.update();
  requestAnimationFrame(render);
}

window.addEventListener("mousemove", function (e) {
  mouse.x = (e.clientX / size.width) * 2 - 1;
  mouse.y = 1 - (e.clientY / size.height) * 2;
});
