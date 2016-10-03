
<script>

{
	

	cameraRTT = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -10000, 10000 );
	cameraRTT.position.z = 100;

	sceneRTT = new THREE.Scene();
	rtTexture = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );

	material = new THREE.ShaderMaterial( {

		uniforms: { time: { value: 0.0 } },
		vertexShader: document.getElementById( 'vertexShader' ).textContent,
		fragmentShader: document.getElementById( 'fragment_shader_pass_1' ).textContent

	} );

	var plane = new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight );

	quad = new THREE.Mesh( plane, material );
	quad.position.z = -100;
	sceneRTT.add( quad );



	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );

	renderer.clear();

	// Render first scene into texture

	renderer.render( sceneRTT, cameraRTT, rtTexture, true );
}


</script>
