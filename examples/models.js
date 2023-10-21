import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Stats from 'three/examples/jsm/libs/stats.module';

const scene = new THREE.Scene();
// scene.add(new THREE.AxesHelper(5));

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 7;

const renderer = new THREE.WebGLRenderer();
renderer.useLegacyLights = false;
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0xffffff);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const loader = new GLTFLoader();

// 조명
const ambientLight = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(ambientLight);

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Spot Light
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 5, 0);
scene.add(spotLight);

// 땅 (평면) 생성
const geometry = new THREE.PlaneGeometry(20, 20);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry, material);

// 평면을 xz 평면에 맞춤
plane.rotation.x = Math.PI / 2;

// 평면을 씬에 추가
scene.add(plane);

const textureLoader = new THREE.TextureLoader();

// 아스팔트 텍스처 불러오기
textureLoader.load('./asphalt_texture.jpg', function(texture) {
    // 텍스처가 로드되면 실행되는 콜백

    // 텍스처의 반복 횟수 설정 (선택적)
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);

    // 땅 (평면) 생성
    const geometry = new THREE.PlaneGeometry(20, 20);
    const material = new THREE.MeshStandardMaterial({ map: texture, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);

    // 평면을 xz 평면에 맞춤
    plane.rotation.x = Math.PI / 2;

    // 평면을 씬에 추가
    scene.add(plane);
});


loader.load(
    '/bmw_m4.glb',
    function (gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
            if (child.isLight) {
                child.castShadow = true;
                child.shadow.bias = -0.003;
                child.shadow.mapSize.width = 2048;
                child.shadow.mapSize.height = 2048;
            }
        });
        scene.add(gltf.scene);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    function (error) {
        console.log(error);
    }
);

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

const stats = new Stats();
document.body.appendChild(stats.dom);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
    stats.update();
}

function render() {
    renderer.render(scene, camera);
}

animate();
