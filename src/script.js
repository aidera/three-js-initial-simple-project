import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * ------------
 * PRESETS
 * ------------ */
// Canvas
const canvas = document.getElementById('canvas');

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
let aspectRatio = sizes.width / sizes.height;

// Animation
const clock = new THREE.Clock();

/**
 * ------------
 * SCENE
 * ------------ */
const scene = new THREE.Scene();

/**
 * ------------
 * OBJECTS
 * ------------ */
// Materials
const material = new THREE.MeshStandardMaterial();

// Meshes
const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.y = 0.5;

scene.add(plane, sphere);

/**
 * ------------
 * LIGHTS
 * ------------ */
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

/**
 * ------------
 * CAMERA
 * ------------ */
const camera = new THREE.PerspectiveCamera(75, aspectRatio);
camera.position.z = 3;
scene.add(camera);

/**
 * ------------
 * RENDER
 * ------------ */
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);

/**
 * ------------
 * UTILS
 * ------------ */
// Resize
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  aspectRatio = sizes.width / sizes.height;

  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * ------------
 * ANIMATION
 * ------------ */
const rotateElem = (elem, et) => {
  elem.rotation.y = 0.1 * et;
  elem.rotation.x = -0.15 * et;
};

/**
 * ------------
 * START
 * ------------ */

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  rotateElem(sphere, elapsedTime);

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
