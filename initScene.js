import * as THREE from 'three';
import * as CANNON from 'cannon';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

export function initScene() {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.set(0, 5, 40);
    // camera.position.z = 15;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);

    const world = new CANNON.World();
    
    world.gravity.set(0, -9.82, 0);
    
    const controls = new OrbitControls(camera, renderer.domElement);

    const stats = new Stats();
    document.body.appendChild(stats.dom);

    return { scene ,camera ,renderer , world, stats, controls}
}