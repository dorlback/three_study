import * as THREE from 'three';
import * as CANNON from 'cannon';

export function createSphere(scene, world) {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    const sphereMesh = new THREE.Mesh(geometry, material);
    scene.add(sphereMesh);

    const sphereBody = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 5, 0),
        shape: new CANNON.Sphere(1)
    });
    world.addBody(sphereBody);

    return { mesh:sphereMesh, body:sphereBody };
}
