import * as THREE from 'three';
import * as CANNON from 'cannon';

export const animate = (world, controls) => {

        requestAnimationFrame(animate);
        // world.step(1 / 60);
    
        controls.update();

        // Three.js 객체의 위치를 Cannon.js 객체의 위치로 업데이트
        sphereMesh.position.copy(sphereBody.position);
    
        renderer.render(scene, camera);
        stats.update();
}

