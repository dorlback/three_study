import * as THREE from 'three';
import * as CANNON from 'cannon';

export function createPlane(scene, world) {
    const textureLoader = new THREE.TextureLoader();

    // 땅 (평면) 생성을 일단 보류
    let planeMesh;
    
    textureLoader.load('./asphalt_texture.jpg', function (texture) {
        // 텍스처가 로드되면 실행되는 콜백
    
        // 텍스처의 반복 횟수 설정 (선택적)
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 4);
    
        const geometry = new THREE.PlaneGeometry(20, 20);
        const material = new THREE.MeshStandardMaterial({ map: texture, side: THREE.DoubleSide });
        planeMesh = new THREE.Mesh(geometry, material);
    
        // 평면을 xz 평면에 맞춤
        planeMesh.rotation.x = Math.PI / 2;
    
        // 평면을 씬에 추가
        scene.add(planeMesh);
    });

    // Cannon.js에서 땅을 생성
    const groundBody = new CANNON.Body({
        mass: 0, // 무게가 0이므로 움직이지 않음
        shape: new CANNON.Plane(),
    });
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    world.addBody(groundBody);

    return { mesh: planeMesh, body: groundBody };
}
