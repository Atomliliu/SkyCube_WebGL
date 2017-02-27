THREE.SC_CubeViewport = function ( texCube, width, height, fov ) {
	var root = this;

	this.camera; 
	this.scene; 
	this.controls;// = controls;

	var container, skyBox;
	this.texCube = texCube;
	this.materialsCube = [];

	//Init
	

	this.camera = new THREE.PerspectiveCamera( fov, width / height, 1, 1100 );
	this.camera.position.z = 100;
	//camera.target = new THREE.Vector3( 0, 0, 0 );


	this.controls = new THREE.OrbitControls( root.camera, renderer.domElement );
	/*controls.enableDamping = true;
	controls.dampingFactor = 0.3;
	controls.enableZoom = true;
	controls.enablePan = false;*/

	this.scene = new THREE.Scene();


	init();
	//render();

	animate();

	function init() {

		for ( var i = 0; i < 6; i ++ ) {
			root.materialsCube.push( new THREE.MeshBasicMaterial( { map: root.texCube[ i ].texture} ) );
		}

		var skyBox = new THREE.Mesh( new THREE.CubeGeometry( 1000, 1000, 1000 ), new THREE.MeshFaceMaterial( root.materialsCube ) );//new THREE.Mesh( skyGeo, materialSkyBox );
		skyBox.applyMatrix( new THREE.Matrix4().makeScale( 1, 1,  -1 ) );

		root.scene.add( skyBox );
	}


	function animate() {
		requestAnimationFrame( animate );
		update();
	}


	function update() {
		root.controls.update();
		renderer.render( root.scene, root.camera );
	}

	function onResize() {
		root.camera.aspect = width / height;
		root.camera.updateProjectionMatrix();

		renderer.setSize( width, height );
	}

};

