


THREE.SC_Raster = function ( render, width, height ) {

	var RTTSize = 1024;

	this.render = render;

	this.sceneRTT = new THREE.Scene();

	this.camRTT = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, -10000, 10000 );
	//camRTT.up.set( 0, - 1, 0 );
	this.camRTT.position.z = 100;

	this.rtRTT = new THREE.WebGLRenderTarget( width, height, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat } );



	this.RTTCustom = function( render, rt, mat){
		var plane = new THREE.PlaneBufferGeometry( width, height );
		var quad = new THREE.Mesh( plane, mat );
		quad.position.z = -100;
		this.sceneRTT.add( quad );
		//quad.material.uniforms.map.value = rt.texture;

		var autoClear = render.autoClear;
		render.autoClear = true;
		render.render( this.sceneRTT, this.camRTT, rt, true );
		render.autoClear = autoClear;
	}

	this.RTT = function(mat){
		this.RTTCustom(this.render, this.rtRTT, mat);
	}


	
};

