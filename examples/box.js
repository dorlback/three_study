import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

// 씬 설정
const scene = new THREE.Scene();
//  카메라 설정
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//  렌더러 설정
const renderer = new THREE.WebGLRenderer();
//  렌더러의 사이즈 설정
renderer.setSize( window.innerWidth, window.innerHeight );
// html의 바디 에 렌더된것을 append 한다.
document.body.appendChild( renderer.domElement );

// 박스 생성
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// 박스 mash 텍스쳐 생성
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//  cube 에 박스와 텍스쳐를 넣고 ㄹㅇ 박스 생성
const cube = new THREE.Mesh( geometry, material );
//  신에 박스를 추가함.
scene.add( cube );

// 카메라 포지션
camera.position.z = 6;

// 실제 반복 될 animate 함수
function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

if ( WebGL.isWebGLAvailable() ) {

	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}