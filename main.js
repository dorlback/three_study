import { initScene } from './initScene';
import { createSphere } from './createSphere';
import { createBox } from './createBox';
import { createPlane } from './createPlane';
// import { animate } from './animate';

const { scene, camera, renderer, world, stats, controls } = initScene();
const { mesh: sphereMesh, body: sphereBody } = createSphere(scene, world);
const { mesh: boxMesh, body: boxBody } = createBox(scene, world);
const { mesh: planeMesh, body: groundBody } = createPlane(scene, world);

const animate = () => {
    requestAnimationFrame(animate);
    world.step(1 / 60);
    controls.update();
    // Three.js 객체의 위치를 Cannon.js 객체의 위치로 업데이트
    sphereMesh.position.copy(sphereBody.position);
    boxMesh.position.copy(boxBody.position)

    renderer.render(scene, camera);
    stats.update();
}


animate();