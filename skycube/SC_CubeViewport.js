THREE.SC_CubeViewport = function ( texCube, width, height, fov, renderer ) {
	var root = this;
	this.enabled = true;

	this.camera; 
	this.scene; 
	this.controls;// = controls;

	var container, skyBox;

	this.texCube = texCube;
	this.materialsCube = [];
	this.intiSkyBoxMatrix = new THREE.Matrix4();
	this.curSkyBoxMatrix = new THREE.Matrix4();
	this.deltaSkyBoxRotateMatrix = new THREE.Matrix4();
	this.deltaSkyBoxMatrix = new THREE.Matrix4();
	this.deltaSkyBox = new THREE.Vector3(0.0);
	this.scaleSkyBox = new THREE.Vector3(0.0);

/*
	if(width == undefined){
		this.width = window.innerWidth;
	}
	else{
		this.width = width;
	}

	if(height == undefined){
		this.height = window.innerHeight;
	}
	else{
		this.height = height;
	}
	*/

	//Init
	

	this.camera = new THREE.PerspectiveCamera( fov, width / height, 1, 1500 );
	this.camera.position.z = 100;
	//camera.target = new THREE.Vector3( 0, 0, 0 );


	
	/*controls.enableDamping = true;
	controls.dampingFactor = 0.3;
	controls.enableZoom = true;
	controls.enablePan = false;*/

	this.scene = new THREE.Scene();
	this.onRender;
	/*this.activate=function(){
		
	};*/

	init();
	//animate();
	//render();
	
	
	

	function init() {

		for ( var i = 0; i < 6; i ++ ) {
			root.materialsCube.push( new THREE.MeshBasicMaterial( { map: root.texCube[ i ].texture, side:THREE.DoubleSide} ) );
		}

		skyBox = new THREE.Mesh( new THREE.CubeGeometry( 1000, 1000, 1000 ), new THREE.MeshFaceMaterial( root.materialsCube ) );//new THREE.Mesh( skyGeo, materialSkyBox );
		//skyBox.applyMatrix( new THREE.Matrix4().makeScale( 1, 1,  -1 ) );
		root.intiSkyBoxMatrix.copy(skyBox.matrix);
		root.curSkyBoxMatrix.copy(skyBox.matrix);

		root.scene.add( skyBox );
	}

	this.setFlipSkyBox = function(x,y,z){
		//if(skyBox) skyBox.applyMatrix( new THREE.Matrix4().makeScale( x,y,z ) );
		if(skyBox) {
			root.scaleSkyBox.set(x,y,z);
			skyBox.matrix.copy(root.intiSkyBoxMatrix);
			root.deltaSkyBoxMatrix.multiplyMatrices(root.deltaSkyBoxRotateMatrix, new THREE.Matrix4().makeScale( x,y,z ));
			root.updateSkyBoxMatrix();
			//root.deltaSkyBoxMatrix.
			//console.log(root.deltaSkyBoxMatrix);
		}
	};

	this.renderView = renderView;
	this.activate = activate;
	this.deactivate = deactivate;
	this.dispose = dispose;
	this.disableControls = disableControls;
	this.enableControls = enableControls;
	this.asBackground = asBackground;
	this.asNormal = asNormal;
	this.onResize= onResize;

	/*this.setCubeQuaternion = function(axis,angle){
		var quaternion = new THREE.Quaternion();
		quaternion.setFromAxisAngle( axis, THREE.Math.degToRad(angle) );
		skyBox.quaternion = quaternion;
	};


	this.setCubeRotation = function(axis,angle){
		skyBox.matrix.copy(root.intiSkyBoxMatrix);
		root.deltaSkyBoxMatrix = new THREE.Matrix4().makeRotationAxis( axis.normalize(), angle*Math.PI / 180 );
		skyBox.applyMatrix(root.deltaSkyBoxMatrix);
		root.curSkyBoxMatrix.copy(skyBox.matrix);
	};*/

	this.updateCubeRotationValue = function(){
		root.setCubeRotationXYZ(root.deltaSkyBox.x,root.deltaSkyBox.y,root.deltaSkyBox.z);
	};

	this.setCubeRotationX = function(angle){
		root.deltaSkyBox.x = angle;
		root.updateCubeRotationValue();
	};

	this.setCubeRotationY = function(angle){
		root.deltaSkyBox.y = angle;
		root.updateCubeRotationValue();
	};

	this.setCubeRotationZ = function(angle){
		root.deltaSkyBox.z = angle;
		root.updateCubeRotationValue();
	};

	this.setCubeRotationXYZ = function(angleX,angleY,angleZ){
		//root.setCubeRotation(new THREE.Vector3( 1, 0, 0 ),angleX);
		root.deltaSkyBox = new THREE.Vector3(angleX,angleY,angleZ);

		skyBox.matrix.copy(root.intiSkyBoxMatrix);
		skyBox.applyMatrix( new THREE.Matrix4().makeScale( root.scaleSkyBox.x,root.scaleSkyBox.y,root.scaleSkyBox.z ) );

		root.deltaSkyBoxRotateMatrix = new THREE.Matrix4().makeRotationAxis( new THREE.Vector3( 1, 0, 0 ), root.deltaSkyBox.x*Math.PI / 180 );
		root.deltaSkyBoxRotateMatrix.multiplyMatrices(root.deltaSkyBoxRotateMatrix, new THREE.Matrix4().makeRotationAxis( new THREE.Vector3( 0, 1, 0 ), root.deltaSkyBox.y*Math.PI / 180 ));
		root.deltaSkyBoxRotateMatrix.multiplyMatrices(root.deltaSkyBoxRotateMatrix, new THREE.Matrix4().makeRotationAxis( new THREE.Vector3( 0, 0, 1 ), root.deltaSkyBox.z*Math.PI / 180 ));
		root.deltaSkyBoxMatrix.copy(root.deltaSkyBoxRotateMatrix);
		//console.log(root.deltaSkyBoxMatrix);
		root.updateSkyBoxMatrix();
	};

	this.updateSkyBoxMatrix = function(){
		skyBox.applyMatrix(root.deltaSkyBoxMatrix);
		root.curSkyBoxMatrix.copy(skyBox.matrix);
	};

	function activate(){
		root.enabled = true;
		root.controls = new THREE.OrbitControls( root.camera, renderer.domElement );
		root.controls.enablePan = false;
	}

	function deactivate(){
		root.controls.dispose();
		root.enabled = false;
		//root = undefined;
		renderer.clear();
	}

	function dispose(){
		deactivate();
	}

	function disableControls(){
		root.controls.enabled = false;
	}

	function enableControls(){
		root.controls.enabled = true;
	}

	function asBackground(rate){

		for ( var i = 0; i < root.materialsCube.length; i ++ ) {
			if(root.materialsCube[i] != undefined && root.materialsCube[i].isMaterial){
				root.materialsCube[i].transparent = true;
				root.materialsCube[i].opacity = rate;
			}
			
		}

	}

	function asNormal(){

		for ( var i = 0; i < root.materialsCube.length; i ++ ) {
			if(root.materialsCube[i] != undefined && root.materialsCube[i].isMaterial){
				root.materialsCube[i].transparent = false;
				root.materialsCube[i].opacity = 1.0;
			}
			
		}

	}


	function animate() {
		requestAnimationFrame( animate );
		update();
	}


	function renderView() {
		if (root.enabled == false) return;
		root.controls.update();
		renderer.render( root.scene, root.camera );

		//if (root.onRender) {root.onRender(renderer);}
	}

	function onResize(width, height) {
		root.camera.aspect = width / height;
		root.camera.updateProjectionMatrix();

		renderer.setSize( width, height );

	}

	this.getCubeFaceDir = function(length){
		var scale = 1.0;
		var dir = new THREE.Vector3(0,0,1);
		if(length != undefined) scale = length;
		//root.deltaSkyBox = new THREE.Vector3(angleX,angleY,angleZ);


		var dirMatrix = new THREE.Matrix4().makeRotationAxis( new THREE.Vector3( 1, 0, 0 ), root.deltaSkyBox.x*Math.PI / 180 );
		dirMatrix.multiplyMatrices(dirMatrix, new THREE.Matrix4().makeRotationAxis( new THREE.Vector3( 0, 1, 0 ), root.deltaSkyBox.y*Math.PI / 180 ));
		dirMatrix.multiplyMatrices(dirMatrix, new THREE.Matrix4().makeRotationAxis( new THREE.Vector3( 0, 0, 1 ), root.deltaSkyBox.z*Math.PI / 180 ));
		
		dir = dir.applyMatrix4(dirMatrix);
		//console.log(dirMatrix);
		//console.log(dir);
		return dir.setLength(scale);

	};
};

THREE.SC_CubeViewport.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.SC_CubeViewport.prototype.constructor = THREE.SC_CubeViewport;
