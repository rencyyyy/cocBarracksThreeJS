import * as THREE from "https://cdn.skypack.dev/three@0.136.0/build/three.module.js";

import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";

import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let mouseX = window.innerWidth /2;
let mouseY = window.innerHeight /2;

let object;

let controls

let objToRender = "barracks";

const loader = new GLTFLoader();
loader.load(
    `models/${objToRender}/scene.gltf`,
    function (gltf) {
        object = gltf.scene;
        scene.add(object);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
        console.log(error);
    }
);

const renderer = new THREE.WebGLRenderer({ alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("container3D").appendChild(renderer.domElement);

camera.position.z = objToRender === "barracks" ? 25 : 500;

const topLight = new THREE.DirectionalLight(0x333333, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "barracks" ? 5 : 1);
scene.add(ambientLight);

if (objToRender === "barracks") {
    controls = new OrbitControls(camera, renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);


    if (object && objToRender === "barracks") {
        object.rotation.y = -3 + mouseX / window.innerWidth * 3;
        object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
    }
    renderer.render(scene, camera);
}

window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

document.onmousemove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
}

animate()