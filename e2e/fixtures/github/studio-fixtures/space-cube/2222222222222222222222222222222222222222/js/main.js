// A small Three.js game written as modules, as a GitHub repository would have it (e2e fixture).
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { LABEL } from "./label.js";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(400, 300);
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 4 / 3, 0.1, 100);
camera.position.set(2, 2, 3);
new OrbitControls(camera, renderer.domElement);
const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshNormalMaterial());
scene.add(cube);
document.getElementById("label").textContent = `${LABEL} · Three.js r${THREE.REVISION}`;
renderer.setAnimationLoop(() => {
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
});
