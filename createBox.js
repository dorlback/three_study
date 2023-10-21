import * as THREE from 'three';
import * as CANNON from 'cannon';

export function createBox(scene, world) {
    const boxWidth = 1, boxHeight = 1, boxDepth = 1;

    const geometry_box = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);  // 너비, 높이, 깊이
    const material_box = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    const boxMesh = new THREE.Mesh(geometry_box, material_box);
    scene.add(boxMesh);

    // Cannon.js에서 박스 물리 바디 생성
    const halfExtents = new CANNON.Vec3(boxWidth/2, boxHeight/2, boxDepth/2);  // 박스의 반 크기
    const boxShape = new CANNON.Box(halfExtents);
    const boxBody = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(1, 1, 0), 
        shape: boxShape
    });
    world.addBody(boxBody);

    return { mesh: boxMesh, body: boxBody };
}
