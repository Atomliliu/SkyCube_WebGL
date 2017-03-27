THREE.SC_ViewportHelper = function ( size, divisions, renderer, scene, camera ) {
	var root = this;

	this.enable = false;

	this.sceneHelper = scene;
	this.camHelper = camera;

	//Init
	this.sceneHelper = new THREE.Scene();
	var grid = new THREE.GridHelper(size, divisions);
	root.sceneHelper.add(grid);


	function renderHelper() {
		if (root.enabled == false) return;
		renderer.render( root.sceneHelper, root.camHelper );

		//if (root.onRender) {root.onRender(renderer);}
	}

	function onResize(width, height) {
		//root.camera.aspect = width / height;
		//root.camera.updateProjectionMatrix();

		//renderer.setSize( width, height );

	}
	
};

THREE.SC_ViewportHelper.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.SC_ViewportHelper.prototype.constructor = THREE.SC_ViewportHelper;

