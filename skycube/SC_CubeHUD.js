THREE.SC_CubeHUD = function ( cubeMapImg, width, height, domElement ) {
	var root = this;

	var RTTex, rendererRTT, camRTT, sceneRTT,shaderRTT,uniformsRTT;
	var RTTtextures = [];
	var RTTSize = 1024;

	var container, skyBox;

	//Init

	

	for ( var i = 0; i < 6; i ++ ) {

		RTTtextures[ i ] = new THREE.WebGLRenderTarget( RTTSize, RTTSize, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );

	}

	container = document.getElementById( 'container' );
	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.autoClear = false;//MUst turn it off if you want add multi renders in same buffer
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
	camera.position.z = 100;
	//camera.target = new THREE.Vector3( 0, 0, 0 );

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.enableDamping = true;
	controls.dampingFactor = 0.3;
	controls.enableZoom = true;
	controls.enablePan = false;

	scene = new THREE.Scene();
	sceneRTT = new THREE.Scene();
	sceneCube = new THREE.Scene();
	sceneCube.add( camCube );
	


	//RTT
	var LLTex = new THREE.TextureLoader().load( 'textures/2294472375_24a3b8ef46_o.jpg', function() {
		UpdateRTT();
		//renderer, scene, cam, mat, matFaceVal
		//texCube.updateCubeMap( renderer, sceneRTT, camRTT, materialRTT, materialRTT.uniforms.nFace);
	});







	function UpdateRTT(){
		//var texturezzz = new THREE.TextureLoader().load( "textures/water.jpg", function ( texture ) {

		for (var i = 0; i < 6; i++){
			materialRTT.uniforms.nFace.value = i;
			renderer.render( sceneRTT, camRTT, RTTtextures[i], true );

		}
		camCube.updateCubeMap( renderer, sceneCube );
	}

};

THREE.SC_CubeHUD.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.SC_CubeHUD.prototype.constructor = THREE.SC_CubeHUD;


<script src="../build/three.js"></script>
		<script src="js/controls/OrbitControls.js"></script>
		<script src="js/skycube/SC_Raster.js"></script>
		<script src="js/skycube/SC_OutputImg.js"></script>
		<script src="js/skycube/SC_OutHUD.js"></script>
		
		<script src="js/SC_SL.js"></script>
		<script src="js/SC_SL2.js"></script>

		<script src="../examples/js/libs/dat.gui.min.js"></script>

		<script>

			var effectController  = {
				tRGBMSampler: null,
				EV: 0,
				maxRange: 6,
				GammaIn: 1, 
				GammaOut: 1 
			};


			var camera, scene, controls, renderer, RTTex, rendererRTT, camRTT, sceneRTT,shaderRTT,uniformsRTT,cameraHUD,sceneHUD;
			//var updateTex = false;
			var materialsCube = [];
			var materialsCube2 = [];
			var RTTtextures = [];
			var RTTSize = 1024;
			var texCube;
			var camCube, sceneCube;

			var WebGLCubeMapIndex = [];
			//var mouse = new THREE.Vector2(), raycaster, INTERSECTED;

			var hud;
			//var _hovered = null

			init();
			//render();

			animate();



			function UpdateRTT(){
				//var texturezzz = new THREE.TextureLoader().load( "textures/water.jpg", function ( texture ) {

				for (var i = 0; i < 6; i++){
					materialRTT.uniforms.nFace.value = i;
					renderer.render( sceneRTT, camRTT, RTTtextures[i], true );

				}
				camCube.updateCubeMap( renderer, sceneCube );


			}




			



			function init() {

				var container, skyBox;

				texCube = new THREE.SC_CubeMap(RTTSize);

				camCube = new THREE.CubeCamera( 1, 100000, RTTSize );

				//raycaster = new THREE.Raycaster();


				for ( var i = 0; i < 6; i ++ ) {

					RTTtextures[ i ] = new THREE.WebGLRenderTarget( RTTSize, RTTSize, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );

				}








				container = document.getElementById( 'container' );
				renderer = new THREE.WebGLRenderer({ alpha: true });
				renderer.autoClear = false;//MUst turn it off if you want add multi renders in same buffer
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
				camera.position.z = 100;
				//camera.target = new THREE.Vector3( 0, 0, 0 );

				controls = new THREE.OrbitControls( camera, renderer.domElement );
				controls.enableDamping = true;
				controls.dampingFactor = 0.3;
				controls.enableZoom = true;
				controls.enablePan = false;

				scene = new THREE.Scene();
				sceneRTT = new THREE.Scene();
				sceneCube = new THREE.Scene();
				sceneCube.add( camCube );
				


				//RTT
				var LLTex = new THREE.TextureLoader().load( 'textures/2294472375_24a3b8ef46_o.jpg', function() {
					UpdateRTT();
					//renderer, scene, cam, mat, matFaceVal
					//texCube.updateCubeMap( renderer, sceneRTT, camRTT, materialRTT, materialRTT.uniforms.nFace);
				});

				shaderRTT = THREE.ShaderLib[ "LL2CUBE" ];
				uniformsRTT = THREE.UniformsUtils.clone( shaderRTT.uniforms );
				uniformsRTT.tSampler.value = LLTex;
				uniformsRTT.nFace.value = 0;
				//No need flip for mesh cubebox
				//uniformsRTT.vUvFlip.value = new THREE.Vector2(0.0,1.0);
				materialRTT = new THREE.ShaderMaterial( {

					uniforms: uniformsRTT,
					vertexShader: shaderRTT.vertexShader,
					fragmentShader: shaderRTT.fragmentShader

				} );



				camRTT = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -10000, 10000 );
				//camRTT.up.set( 0, - 1, 0 );
				camRTT.position.z = 100;

				
				

				RTTex = new THREE.WebGLRenderTarget( RTTSize, RTTSize, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );



				var plane = new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight );

				var quad = new THREE.Mesh( plane, materialRTT );
				quad.position.z = -100;
				sceneRTT.add( quad );
				

				//updateTex = true;

				
				for ( var i = 0; i < 6; i ++ ) {

					materialsCube.push( new THREE.MeshBasicMaterial( { map: RTTtextures[ i ].texture} ) );
					//materialsCube2.push( new THREE.MeshBasicMaterial( { map: RTTtextures[ i ].texture} ) );

				}

				var skyBoxCube = new THREE.Mesh( new THREE.CubeGeometry( 1000, 1000, 1000 ), new THREE.MeshFaceMaterial( materialsCube ) );
				skyBoxCube.applyMatrix( new THREE.Matrix4().makeScale( 1, 1,  -1 ) );
				sceneCube.add( skyBoxCube );

				//var skyGeo = new THREE.SphereGeometry( 500, 60, 40 );
				//skyGeo.applyMatrix( new THREE.Matrix4().makeScale( 1, 1,  -1 ) );
				var skyBox = new THREE.Mesh( new THREE.CubeGeometry( 1000, 1000, 1000 ), new THREE.MeshFaceMaterial( materialsCube ) );//new THREE.Mesh( skyGeo, materialSkyBox );
				skyBox.applyMatrix( new THREE.Matrix4().makeScale( 1, 1,  -1 ) );

				scene.add( skyBox );
				






				/////////////////////HUD////////////////////////////
				var width = window.innerWidth;
  				var height = window.innerHeight;
  				//console.log(width);

  				hud = new THREE.SC_OutHUD(camCube.renderTarget.texture, width, height, renderer.domElement);

				//////////////////////////////////////


				//////////////////////////////////////



				// Create plane to render the HUD. This plane fill the whole screen.
				var HUDplaneGeometry = new THREE.PlaneGeometry( hudWidth, hudHeight );
  				var HUDplane = new THREE.Mesh( HUDplaneGeometry, materialUI );
  				sceneHUD.add( HUDplane );



  				var HUDplaneGeometry2 = new THREE.PlaneGeometry( 160, 120 );
  				var HUDplane2 = new THREE.Mesh( HUDplaneGeometry2, materialUI2 );
  				HUDplane2.position.y = -100;//place hud plane pos on screen

  				sceneHUD.add( HUDplane2 );


				//////////////////////////////////////
				//END UI/HUD
				//////////////////////////////////////

				*/



				/////////////////////////////////////////
				//Drag Event

				document.addEventListener( 'dragover', function ( event ) {

					event.preventDefault();
					event.dataTransfer.dropEffect = 'copy';

				}, false );

				document.addEventListener( 'dragenter', function ( event ) {

					document.body.style.opacity = 0.5;

				}, false );

				document.addEventListener( 'dragleave', function ( event ) {

					document.body.style.opacity = 1;

				}, false );

				document.addEventListener( 'drop', function ( event ) {

					event.preventDefault();

					var reader = new FileReader();
					reader.addEventListener( 'load', function ( event ) {

						materialRTT.uniforms.tSampler.value.image.src = event.target.result;
						materialRTT.uniforms.tSampler.value.needsUpdate = true;
						UpdateRTT();
						console.log("LOADED");

					}, false );
					reader.readAsDataURL( event.dataTransfer.files[ 0 ] );

					document.body.style.opacity = 1.0;

				}, false );

				//
				////////////////////////////////////////////////////

				window.addEventListener( 'resize', onWindowResize, false );


				function guiChanged() {

					update();
				}

				var gui = new dat.GUI();

				gui.add( effectController, "maxRange", 1.0, 8.0, 8.0 ).onChange( guiChanged );
				gui.add( effectController, "EV", -8.0, 8.0, 0.0 ).onChange( guiChanged );


				guiChanged();



			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				//Update HUD size here
				hud.updateHUD( window.innerWidth, window.innerHeight );

			}



			function animate() {
				requestAnimationFrame( animate );
				//if (updateTex == true) update2();
				update();


			}



			function update() {
				controls.update();
				//console.log("Screen");
				renderer.render( scene, camera );
				//renderer.setClearColor( 0x000000, 0 ); // the default
				//renderer.render( hud.sceneHUD, hud.cameraHUD );
				hud.renderHUD(renderer);

			}
