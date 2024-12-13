// threejs-cube.js

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";

// Initialize Three.js
export function initializeThreeJS(canvasId) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById(canvasId),
    alpha: true, // Allows transparency
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Add a rotating cube
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(ambientLight, pointLight);

  // Set camera position
  camera.position.z = 5;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();

  // Handle resizing
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
