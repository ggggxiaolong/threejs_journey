import "./style.css";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CameraHelper,
  Clock,
  Color,
  CubeTextureLoader,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  Scene,
  ShaderMaterial,
  sRGBEncoding,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from "three";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GUI } from "dat.gui";

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
};

const canvas = document.querySelector("canvas.webgl");
const scene = new Scene();
const gui = new GUI();
const params = {};
const cubeLoader = new CubeTextureLoader();
const gltfLoader = new GLTFLoader();
const textureLoader = new TextureLoader();
// const glfLoader = new Gl
const envTexture = cubeLoader
  .setPath("/textures/environmentMaps/0/")
  .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);

envTexture.encoding = THREE.sRGBEncoding;
scene.background = envTexture;
scene.environment = envTexture;

const mapTexture = textureLoader.load("/models/LeePerrySmith/color.jpg");
mapTexture.encoding = THREE.sRGBEncoding;
const normalTexture = textureLoader.load("/models/LeePerrySmith/normal.jpg");
const material = new MeshStandardMaterial({
  map: mapTexture,
  normalMap: normalTexture,
});

const depthMaterial = new THREE.MeshDepthMaterial({
  depthPacking: THREE.RGBADepthPacking,
});

const customUniforms = {
  uTime: { value: 0 },
};
material.onBeforeCompile = (shader) => {
  shader.uniforms.uTime = customUniforms.uTime
  shader.vertexShader = shader.vertexShader.replace(
    '#include <common>',
    `
      #include <common>
      uniform float uTime;
      mat2 get2dRotateMatrix(float _angle)
      {
          return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
      }
    `
  );
  shader.vertexShader = shader.vertexShader.replace(
    '#include <begin_vertex>',
    `
        #include <begin_vertex>
        float angle = sin(position.y + uTime) * 0.4;
        mat2 rotateMatrix = get2dRotateMatrix(angle);
        transformed.xz = rotateMatrix * transformed.xz;
    `,
  );
};

depthMaterial.onBeforeCompile = (shader) => {
  shader.uniforms.uTime = customUniforms.uTime
  shader.vertexShader = shader.vertexShader.replace(
    '#include <common>',
    `
      #include <common>
      uniform float uTime;
      mat2 get2dRotateMatrix(float _angle)
      {
          return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
      }
    `
  );
  shader.vertexShader = shader.vertexShader.replace(
    '#include <begin_vertex>',
    `
        #include <begin_vertex>
        float angle = sin(position.y + uTime) * 0.4;
        mat2 rotateMatrix = get2dRotateMatrix(angle);
        transformed.xz = rotateMatrix * transformed.xz;
    `,
  );
};
function updateAllMaterial() {
  scene.traverse((obj) => {
    if (obj instanceof Mesh && obj.material instanceof MeshStandardMaterial) {
      obj.material.envMapIntensity = 5;
      obj.material.needsUpdate = true;
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });
}

gltfLoader.load("/models/LeePerrySmith/LeePerrySmith.glb", (model) => {
  const mesh = model.scene.children[0];
  mesh.rotation.y = 0.5 * Math.PI;
  mesh.material = material;
  mesh.customDepthMaterial = depthMaterial;
  scene.add(mesh);
  updateAllMaterial();
});

const camera = new PerspectiveCamera(75, size.width / size.height, 0.01, 100);
camera.position.set(4, 1, -5);
scene.add(camera);

const light = new DirectionalLight(0xffffff, 3);
light.castShadow = true;
light.shadow.camera.far = 15;
light.shadow.mapSize.set(1024, 1024);
light.position.set(2, 2, -2.25);
scene.add(light);

// const cameraHelper = new CameraHelper(light.shadow.camera);
// scene.add(cameraHelper)

const render = new WebGLRenderer({ canvas: canvas, antialias: true });
render.setSize(size.width, size.height);
render.setPixelRatio(size.devicePixelRatio);
render.physicallyCorrectLights = true;
render.outputEncoding = THREE.sRGBEncoding;
render.shadowMap.enabled = true;
render.shadowMap.type = THREE.PCFShadowMap;
render.toneMapping = THREE.ACESFilmicToneMapping;
render.toneMappingExposure = 1;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  size.pixelRatio = Math.min(window.devicePixelRatio, 2);

  render.setSize(size.width, size.height);
  render.setPixelRatio(size.devicePixelRatio);
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
});

const clock = new Clock();

function update() {
  customUniforms.uTime.value = clock.getElapsedTime();
  render.render(scene, camera);
  controls.update();
  window.requestAnimationFrame(update);
}
update();
