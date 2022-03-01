// import {OBJLoader} from '/examples/jsm/loaders/OBJLoader.js';

let fov = 75;
let aspect = 1;  // the canvas default
let near = 0.1;
let far = 10;
let camera;
let canvas;
let renderer;
let scene;
let earth = "images/wall.jpg"; 
let alien = "objects/Alien_Animal.obj";

function main() {

    setup();
    // renderCube(1,1,1, true, earth);
    loadObject();

}

function setup() {
    canvas = document.getElementById('asgn');
    renderer = new THREE.WebGLRenderer({ canvas });
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;
    scene = new THREE.Scene();

}

function renderCube(boxWidth = 1, boxHeight = 1, boxDepth = 1, rotate = true, image = "") {
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    let cubes = [];
    if (image != "") {
        const loader = new THREE.TextureLoader();
        loader.load(image, (texture) => {
            const material = new THREE.MeshBasicMaterial({
                map: texture,
            });
            const cube = new THREE.Mesh(geometry, material);
            cubes.push(cube);
            scene.add(cube);
        });
    }
    else {
        const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 })
        const cube = new THREE.Mesh(geometry, material);
        cubes.push(cube);
        scene.add(cube);
    }


    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render(time) {
        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        cubes.forEach((cube, ndx) => {
            const speed = .2 + ndx * .1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        });
        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

function loadObject() {
    const objLoader = new OBJLoader();
    objLoader.load(alien, (root) => {
        scene.add(root);
    });
}

exports.module.main = main;
