import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 카메라 설정
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    500
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

// 장면 설정
const scene = new THREE.Scene();
// 배경화면 설정
scene.background = new THREE.Color(0xffffff);
// 머티리얼 설정
const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

// 지오메트리 설정
const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));
const geometry = new THREE.BufferGeometry().setFromPoints(points);

// 선 객체 생성
const line = new THREE.Line(geometry, material);

// 장면에 선 추가
scene.add(line);

// 렌더링 애니메이션
let isWhite = true;  // 배경색 상태를 저장하는 변수
let frameCount = 0;  // 프레임 카운터

function animate() {
    requestAnimationFrame(animate);

    frameCount++;

    if (frameCount % 60 < 30) {
        if (!isWhite) {
            scene.background = new THREE.Color(0xffffff);
            isWhite = true;
        }
    } else {
        if (isWhite) {
            scene.background = new THREE.Color(0xFFB6C1);
            isWhite = false;
        }
    }

    renderer.render(scene, camera);
}

animate();
