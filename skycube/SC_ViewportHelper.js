THREE.SC_ViewportHelper = function ( renderer, scene, camera ) {
	var root = this;

	this.enable = false;

	this.sceneHelper = scene;
	this.camHelper = camera;
	//Init
	//this.sceneHelper = new THREE.Scene();
	var grid2d,grid3d,gridPolar3d,axis3d,arrow3d,box3d;



	this.add3DGridSurface = function(size, divisions, color, colorCL){
		if(grid3d == undefined){
			grid3d = new THREE.GridHelper(size, divisions,colorCL,color);
			root.sceneHelper.add(grid3d);
		}
	}
	this.remove3DGridSurface = function(){
		if(grid3d == undefined){
			
			root.sceneHelper.remove(grid3d);
			grid3d = undefined;
		}
	}


	this.add3DGridPolarSurface = function(radius, radials, circles, divisions, color, colorCL){
		if(gridPolar3d == undefined){
			gridPolar3d = new THREE.PolarGridHelper(radius, radials, circles, divisions, color, colorCL);
			root.sceneHelper.add(gridPolar3d);
		}
	}
	this.remove3DGridPolarSurface = function(){
		if(gridPolar3d == undefined){	
			root.sceneHelper.remove(gridPolar3d);
			gridPolar3d = undefined;
		}
	}

	this.add3DAxis = function(size){
		if(axis3d == undefined){
			axis3d = new THREE.AxisHelper(size);
			root.sceneHelper.add(axis3d);
		}
	}
	this.remove3DAxis = function(){
		if(axis3d == undefined){
			
			root.sceneHelper.remove(axis3d);
			axis3d = undefined;
		}
	}

	this.add3DArrow = function(start, end, color, headSize){
		if(arrow3d == undefined){
			var dir = end;
			dir.normalize();
			arrow3d = new THREE.ArrowHelper(dir, start, end.length(), color, headSize,headSize);
			root.sceneHelper.add(arrow3d);
		}
	}
	this.remove3DArrow = function(){
		if(arrow3d == undefined){
			root.sceneHelper.remove(arrow3d);
			arrow3d = undefined;
		}
	}

	this.add3DBox = function(sizeX,sizeY,sizeZ, color){
		if(box3d == undefined){
			var objTmp = new THREE.Mesh( new THREE.CubeGeometry( sizeX, sizeY, sizeZ ), new THREE.MeshBasicMaterial( 0xff0000 ) );
			box3d = new THREE.BoxHelper(objTmp,color);
			root.sceneHelper.add(box3d);
		}
	}
	this.remove3DBox = function(){
		if(box3d == undefined){
			root.sceneHelper.remove(box3d);
			box3d = undefined;
		}
	}

	


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

