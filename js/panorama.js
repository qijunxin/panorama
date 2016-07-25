function Panorama(options){
	this.options = options;
	this.container = options.containerID? document.getElementById(options.containerID):document.body;
	this.textures = options.textures || [];
	this.init();
	this.build();
}

var scene, renderer, camera, panorama;
var renderWidth, renderHeight;
var isUserInteracting = false,
	onMouseDownMouseX = 0, onMouseDownMouseY = 0,
	lon = 90, onMouseDownLon = 0,
	lat = 0, onMouseDownLat = 0,
	phi = 0, theta = 0,
	target = new THREE.Vector3();

Panorama.prototype.init = function(){
	if(this.options.containerID){
		renderWidth = this.container.offsetWidth;
		renderHeight = this.container.offsetHeight;
	}else{
		renderWidth = window.innerWidth;
		renderHeight = window.innerHeight;
	}
}
Panorama.prototype.build = function(){
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(renderWidth,renderHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
	this.container.appendChild(renderer.domElement);
	
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(75, renderWidth/renderHeight, 1, 1100);
	scene.add(camera);

	var geometry = new THREE.BoxGeometry( 300, 300, 300, 7, 7, 7 );
	var materials = [];
	for(var i = 0 ; i < this.textures.length ; i++){
		var texture = new THREE.TextureLoader().load(this.textures[i]);
		materials.push( new THREE.MeshBasicMaterial({map:texture}));
	}
	var material = new THREE.MultiMaterial(materials);
	panorama = new THREE.Mesh( geometry, material);
	panorama.scale.x = - 1;

	scene.add(panorama);


	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );

	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );

	window.addEventListener( 'resize', onWindowResize, false );

	animate();

}
function animate(){
	requestAnimationFrame(animate);
	if ( isUserInteracting === false ) {

		lon += 0.1;

	}

	lat = Math.max( - 85, Math.min( 85, lat ) );
	phi = THREE.Math.degToRad( 90 - lat );
	theta = THREE.Math.degToRad( lon );

	target.x = 500 * Math.sin( phi ) * Math.cos( theta );
	target.y = 500 * Math.cos( phi );
	target.z = 500 * Math.sin( phi ) * Math.sin( theta );

	camera.lookAt( target );

	renderer.render( scene, camera );
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseDown( event ) {

	event.preventDefault();

	isUserInteracting = true;

	onPointerDownPointerX = event.clientX;
	onPointerDownPointerY = event.clientY;

	onPointerDownLon = lon;
	onPointerDownLat = lat;

}

function onDocumentMouseMove( event ) {

	if ( isUserInteracting === true ) {

		lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
		lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

	}

}

function onDocumentMouseUp( event ) {

	isUserInteracting = false;

}

function onDocumentMouseWheel( event ) {

	camera.fov -= event.wheelDeltaY * 0.05;
	camera.updateProjectionMatrix();

}


function onDocumentTouchStart( event ) {

	if ( event.touches.length == 1 ) {

		event.preventDefault();

		onPointerDownPointerX = event.touches[ 0 ].pageX;
		onPointerDownPointerY = event.touches[ 0 ].pageY;

		onPointerDownLon = lon;
		onPointerDownLat = lat;

	}

}

function onDocumentTouchMove( event ) {

	if ( event.touches.length == 1 ) {

		event.preventDefault();

		lon = ( onPointerDownPointerX - event.touches[0].pageX ) * 0.1 + onPointerDownLon;
		lat = ( event.touches[0].pageY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

	}

}
