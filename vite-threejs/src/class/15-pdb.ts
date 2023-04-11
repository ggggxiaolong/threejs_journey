import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { PDBLoader, PDB } from "three/examples/jsm/loaders/PDBLoader";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer";
import { Size } from "./model";
import { Util } from "./utils";
import {GUI} from 'lil-gui';

const size = Size.getInstance();
const scene = new THREE.Scene();
const renderer = Util.initRenderer(size);
const camera = Util.initCamera(size);
const control = new TrackballControls(camera, renderer.domElement);
const loader = new PDBLoader();
const labelRenderer = new CSS2DRenderer();
const group = new THREE.Group();
const clock = new THREE.Clock();
const matrix = new THREE.Matrix4();
const color = new THREE.Color();
const position = new THREE.Vector3();
const position2 = new THREE.Vector3();

init();

render();

function init() {
  labelRenderer.setSize(size.width, size.height);
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.top = "0px";
  labelRenderer.domElement.style.pointerEvents = "none";
  document.body.appendChild(labelRenderer.domElement);
  const gui = new GUI();
  camera.position.set(1, 5, 10);
  size.onResize(function () {
    Util.onResize(size, camera, renderer);
    labelRenderer.setSize(size.width, size.height);
  });
  //   Util.addAxesHelper(scene, 1);
  new THREE.Color();

  const light1 = new THREE.DirectionalLight(0xffffff, 1);
  light1.position.set(1, 1, 1);
  scene.add(light1);
  const light2 = new THREE.DirectionalLight(0xffffff, 1);
  light2.position.set(-1, -1, 1);
  scene.add(light2);
  scene.add(group);
  loader.setPath("./models/pdb/")

  const MOLECULES = {
        'Ethanol': 'ethanol.pdb',
				'Aspirin': 'aspirin.pdb',
				'Caffeine': 'caffeine.pdb',
				'Nicotine': 'nicotine.pdb',
				'LSD': 'lsd.pdb',
				'Cocaine': 'cocaine.pdb',
				'Cholesterol': 'cholesterol.pdb',
				'Lycopene': 'lycopene.pdb',
				'Glucose': 'glucose.pdb',
				'Aluminium oxide': 'Al2O3.pdb',
				'Cubane': 'cubane.pdb',
				'Copper': 'cu.pdb',
				'Fluorite': 'caf2.pdb',
				'Salt': 'nacl.pdb',
				'YBCO superconductor': 'ybco.pdb',
				'Buckyball': 'buckyball.pdb',
				'Graphite': 'graphite.pdb'
  }
  const params = {
    molecule: 'caffeine.pdb'
  }
  gui.add( params, 'molecule', MOLECULES ).onChange( loadModel );
  loadModel("caffeine.pdb");

}

function loadModel(path: string) {
  while (group.children.length > 0){
    const mesh = group.children[0];
    mesh.parent?.remove(mesh);
  }

  loader.load(path, function (pdb: PDB) {
    const data = pdb.json.atoms;
    const geometry = new THREE.SphereGeometry(0.2);
    const boxGeometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const positions = pdb.geometryAtoms.attributes["position"];
    const colors = pdb.geometryAtoms.attributes["color"];
    const atomMesh = new THREE.InstancedMesh(
      geometry,
      material,
      positions.count
    );

    for (let i = 0; i < positions.count; i++) {
      position.set(positions.getX(i), positions.getY(i), positions.getZ(i));
      matrix.setPosition(position);
      color.setRGB(colors.getX(i), colors.getY(i), colors.getZ(i));
      atomMesh.setMatrixAt(i, matrix);
      atomMesh.setColorAt(i, color);

      const metaData = data[i];
      const textElement = document.createElement("div");
      textElement.className = "label";
      textElement.style.color = `rgb(${metaData[3][0]}, ${metaData[3][1]}, ${metaData[3][2]})`;
      textElement.textContent = metaData[4];
      const label = new CSS2DObject(textElement);
      label.position.set(metaData[0], metaData[1], metaData[2]);
      group.add(label);
    }
    group.add(atomMesh);
    const bondsPositions = pdb.geometryBonds.attributes["position"];
    for (let i = 0; i < bondsPositions.count; i += 2) {
      position.set(
        bondsPositions.getX(i),
        bondsPositions.getY(i),
        bondsPositions.getZ(i)
      );
      position2.set(
        bondsPositions.getX(i + 1),
        bondsPositions.getY(i + 1),
        bondsPositions.getZ(i + 1)
      );
      const bond = new THREE.Mesh(boxGeometry, material);
      bond.position.copy(position);
      bond.position.lerp(position2, 0.5);
      bond.scale.set(1, 1, position.distanceTo(position2) * 10);
      bond.lookAt(position2);
      group.add(bond);
    }
  });
}

function render() {
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  control.update();
  const elapsedTime = clock.getElapsedTime();
  group.rotation.x = elapsedTime * 0.3;
  group.rotation.y = elapsedTime * 0.1;
  requestAnimationFrame(render);
}
