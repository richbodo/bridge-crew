// A spinning cube, written the way games for Three.js r128 were: a test fixture for Bring in a game.
document.getElementById("three").textContent = "Three.js r" + THREE.REVISION;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(320, 240);
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 100);
camera.position.z = 3;
new THREE.OrbitControls(camera, renderer.domElement);
const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({ color: 0xf2aa4c }));
scene.add(cube, new THREE.HemisphereLight(0xffffff, 0x223344, 1));
function frame() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.02;
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}
frame();
