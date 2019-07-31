import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    500
);

camera.position.set(0, 0, 100);

camera.lookAt(0, 0, 0);

const material = new THREE.LineBasicMaterial({ color: 0x00000ff });
const geometry = new THREE.Geometry();

geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
geometry.vertices.push(new THREE.Vector3(0, 10, 0));
geometry.vertices.push(new THREE.Vector3(10, 0, 0));

const line = new THREE.Line(geometry, material);

scene.add(line);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

// const animate = () => {
//     requestAnimationFrame(animate);
// };
//
// animate();
