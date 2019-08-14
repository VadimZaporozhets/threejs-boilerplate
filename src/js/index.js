import {
    WebGLRenderer,
    PerspectiveCamera,
    AmbientLight,
    SpotLight,
    Scene,
    PCFSoftShadowMap,
    SphereGeometry,
    MeshLambertMaterial,
    Mesh
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import TWEEN from '@tweenjs/tween.js';
import Stats from 'stats.js';
import * as dat from 'dat.gui';

const gui = new dat.GUI();

const canvas = document.getElementById('canvas');

let scene,
    renderer,
    camera,
    stats,
    controls,
    screenWidth = window.innerWidth,
    screenHeight = window.innerHeight;

const createScene = () => {
    renderer = new WebGLRenderer({
        antialias: true
    });
    scene = new Scene();
    stats = new Stats();
    camera = new PerspectiveCamera(75, screenWidth / screenHeight, 0.1, 10000);
    controls = new OrbitControls(camera, renderer.domElement);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;

    camera.position.set(0, 0, 12);
    camera.lookAt(0, 0, 0);

    renderer.setSize(window.innerWidth, window.innerHeight);
    canvas.appendChild(renderer.domElement);
    document.body.appendChild(stats.dom);
};

let ambientLight, spotLight;

const createLights = () => {
    ambientLight = new AmbientLight(0xffffff, 0.3);
    spotLight = new SpotLight(0xffffff, 1);

    spotLight.position.set(14, 14, 16);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.05;
    spotLight.decay = 2;
    spotLight.distance = 200;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 200;

    gui.add(spotLight, 'intensity', 0, 2)
        .name('Spotlight intensity')
        .listen();

    gui.add(ambientLight, 'intensity', 0, 2)
        .name('Ambient intensity')
        .listen();

    scene.add(spotLight);
    scene.add(ambientLight);
};

let sphere;

const createObject = () => {
    const geometry = new SphereGeometry(5, 60, 60);
    const material = new MeshLambertMaterial({
        color: 'yellow'
    });

    sphere = new Mesh(geometry, material);
    sphere.castShadow = true;
    sphere.receiveShadow = true;

    scene.add(sphere);
};

const animateObject = () => {
    sphere.rotation.y += 0.01;
};

const init = () => {
    createScene();
    createLights();

    createObject();

    window.addEventListener('resize', handleWindowResize);

    render();
};

const render = () => {
    renderer.render(scene, camera);
    controls.update();
    stats.update();
    TWEEN.update();

    animateObject();

    requestAnimationFrame(render);
};

const handleWindowResize = () => {
    screenHeight = window.innerHeight;
    screenWidth = window.innerWidth;
    renderer.setSize(screenWidth, screenHeight);
    camera.aspect = screenWidth / screenHeight;
    camera.updateProjectionMatrix();
};

init();
