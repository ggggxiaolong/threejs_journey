import * as THREE from "three";
import { Size } from "./model";
import { Util } from "./utils";

const size = Size.getInstance();
const scene = new THREE.Scene();
const renderer = Util.initRenderer(size);
const camera = Util.initCamera(size, 45);
const control = Util.initTrackBallControl(camera, renderer);

init();
render();
addMesh();

function init() {
  scene.background = new THREE.Color(0x222222);
  camera.position.set(20, 0, 500);
  Util.addAxesHelper(scene, 100);
  control.minDistance = 200;
  control.maxDistance = 500;

  const envLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(envLight);

  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.copy(camera.position);
  scene.add(pointLight);
}

function addMesh() {
  const path1: Array<THREE.Vector3> = [
    new THREE.Vector3(-60, -100, 60),
    new THREE.Vector3(-60, 20, 60),
    new THREE.Vector3(-60, 120, 60),
    new THREE.Vector3(60, 40, -60),
    new THREE.Vector3(60, -100, -60),
  ];
  const closedSpline = new THREE.CatmullRomCurve3(path1, true, "catmullrom");
  const shapePoints: Array<THREE.Vector2> = new Array();
  const shapeFace = 3;
  const angle = (Math.PI * 2) / shapeFace;
  for (let i = 0; i < shapeFace; i++) {
    const partAngle = angle * i;
    shapePoints.push(
      new THREE.Vector2(Math.cos(partAngle) * 20, Math.sin(partAngle) * 20)
    );
  }
  const shape = new THREE.Shape(shapePoints);
  const extrudeSetting: THREE.ExtrudeGeometryOptions = {
    steps: 100,
    bevelEnabled: false,
    extrudePath: closedSpline,
  };
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSetting);
  const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
  const mesh1 = new THREE.Mesh(geometry, material);
  scene.add(mesh1);

  const path2: Array<THREE.Vector3> = new Array();
  for (let i = 0; i < 10; i++) {
    path2.push(
      new THREE.Vector3(
        (i - 4.5) * 50,
        THREE.MathUtils.randFloat(-50, 50),
        THREE.MathUtils.randFloat(-50, 50)
      )
    );
  }
  const randomLine = new THREE.CatmullRomCurve3(path2);
  const randomExtrudeSetting: THREE.ExtrudeGeometryOptions = {
    steps: 200,
    bevelEnabled: false,
    extrudePath: randomLine,
  };
  const shapePoints2: Array<THREE.Vector2> = new Array();
  const shape2FaceCount = 5;
  const shapeAngle = Math.PI * 2 / shape2FaceCount;
  const shapeHalfAngle = shapeAngle / 2;
  for (let i = 0; i < shape2FaceCount; i++) {
      const angle1 = shapeAngle * i;
      const angle2 = shapeAngle * i + shapeHalfAngle;
    shapePoints2.push(
        new THREE.Vector2(
            Math.cos(angle1) * 20,
            Math.sin(angle1) * 20,
        )
    );
    shapePoints2.push(
        new THREE.Vector2(
            Math.cos(angle2) * 10,
            Math.sin(angle2) * 10,
        )
    );
  }

  const shape2 = new THREE.Shape(shapePoints2);
  const randomGeometry = new THREE.ExtrudeGeometry(shape2, randomExtrudeSetting);
  const material2 = new THREE.MeshLambertMaterial({color: 0xff8000});
  const mesh2 = new THREE.Mesh(randomGeometry, material2);
  scene.add(mesh2);

  const material3 = [material, material2];
  const extrudeSetting3: THREE.ExtrudeGeometryOptions = {
    depth: 20,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 1, 
    bevelSize: 4,
    bevelSegments: 3,
  }
  const geometry3 = new THREE.ExtrudeGeometry(shape2, extrudeSetting3);
  const mesh3 = new THREE.Mesh(geometry3, material3);
  mesh3.position.set(50, 100, 50);
  scene.add(mesh3);
}

function render() {
  renderer.render(scene, camera);
  control.update();
  requestAnimationFrame(render);
}
