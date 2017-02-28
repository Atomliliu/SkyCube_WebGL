//

SCFL_LoadPanorama = function ( imgFile, renderer ) {
	this.img = imgFile;
	this.enabled = true;

	//var imgWidth = this.img.width;
	//var imgHeight = this.img.height;
	var divModal = undefined;

	var root = this;

	this.defIndex = 0;

	//RTT　Import
	var RTTex, rendererRTT, camRTT, sceneRTT,shaderRTT,uniformsRTT;
	//var updateTex = false;
	var materialsCube = [];
	var RTTtextures = [];
	var RTTSize = 1024;//?
	this.TestSize = 1024;//?
	var camCube, sceneCube;

	//
	var WHRatio = [
		2.0,
		1.3333333333333333333333333333333,
		2.0,
		1.0,
		1.0,
		6.0,
		0.75,
		0.16666666666666666666666666666667
	];

	var FormatNames = [
		"Dual-Paraboloid (Hemispheres)",
		"Horizon Cross CubeMap",
		"LatLong (Latitude/Longitude)",
		"Spherical Mirrored Probe (Matcap)",
		"Light Probe (Angular)",
		"Horizon Linear CubeMap",
		"Vertical Cross CubeMap",
		"Vertical Linear CubeMap"
	];


	var FormatImgURL = [
		"textures/sprite1.png",
		"textures/sprite2.png",
		"textures/sprite0.png",
		"textures/sprite1.png",
		"textures/sprite1.png",
		"textures/sprite1.png",
		"textures/sprite1.png",
		"textures/sprite1.png"
	];

	var In_ShaderNames = [
		"LL2CUBE",
		"LL2CUBE",
		"LL2CUBE",
		"LL2CUBE",
		"LL2CUBE",
		"LL2CUBE",
		"LL2CUBE",
		"LL2CUBE"
	];


	//Move this func to common
	function loadjscssfile(fileName, fileType){
	    if (fileType=="js"){ //if filename is a external JavaScript file
	        var fileRef=document.createElement('script')
	        fileRef.setAttribute("type","text/javascript")
	        fileRef.setAttribute("src", fileName)
	    }
	    else if (fileType=="css"){ //if filename is an external CSS file
	        var fileRef=document.createElement("link")
	        fileRef.setAttribute("rel", "stylesheet")
	        fileRef.setAttribute("type", "text/css")
	        fileRef.setAttribute("href", fileName)
	    }
	    if (typeof fileRef!="undefined")
	        document.getElementsByTagName("head")[0].appendChild(fileRef)
	}


	function removeElements(elements) {
	  for (var i=0; i<elements.length; i++) {
	    elements[i].parentNode.removeChild(elements[i]);
	  }
	}

	/*function listDD() {
	    document.getElementById("dropdownList").classList.toggle("show");
	}*/

	function setFormatImg( idName ){
		//var img = document.getElementById('myImg');
		var modalImg = document.getElementById(idName);
		//var captionText = document.getElementById("caption");

		modalImg.src=FormatImgURL[root.defIndex];
	}



	function setupFormatWindow() {
		divModal = document.createElement("div");
		divModal.id = "myModal";
		divModal.setAttribute("class", "modal");

		var divContent = document.createElement("div");
		divContent.setAttribute("class", "modal-content");

		var span = document.createElement("SPAN");
		span.setAttribute("class", "close");
		var closeIcon = document.createTextNode("\xD7");
		span.appendChild(closeIcon);


		var p = document.createElement("P");
		var text1 = document.createTextNode("Some text in the Modal...");
		p.appendChild(text1);

		//Image
		var imgDD = document.createElement("img");
		//imgDD.setAttribute("class", "dropdown");
		imgDD.id="imgDD";



		//dropdown
		var divDD = document.createElement("div");
		//divDD.setAttribute("class", "dropdown");

		var selectDD = document.createElement("select");

		//Add DD List
		for (var i=0;i<FormatNames.length;i++) {
			var item = document.createElement("option");
			item.id = FormatNames[i];
			item.value = FormatNames[i];
			item.innerHTML = FormatNames[i];
			//item.appendChild(document.createTextNode(FormatNames[i]));
			selectDD.appendChild(item);
			
		}
		selectDD.selectedIndex = root.defIndex;
		selectDD.onchange = function(){
		    onSelFormat(this.selectedIndex,this.options[this.selectedIndex].value);
		};
		divDD.appendChild(selectDD);
		//divDD.appendChild(divDDList);

		//Button
		var buttonDD = document.createElement("button");
		buttonDD.setAttribute("class","buttonLoad");
		buttonDD.innerHTML = "Import";
		divDD.appendChild(buttonDD);
		
		//
		divContent.appendChild(span);
		divContent.appendChild(p);
		divContent.appendChild(imgDD);
		divContent.appendChild(divDD);
		divModal.appendChild(divContent);

		document.body.appendChild(divModal);

		setFormatImg("imgDD");

		span.onclick = function() {
		    root.deactivate();
		}

		buttonDD.onclick = function() {
			// body...

			initRTT();

			UpdateRTT(root.onRTTUpdated);

			root.deactivate();
		}
	}

	this.onRTTUpdated = undefined;

	function checkFormatType(){
		var wh = root.img.width/root.img.height;
		var type = WHRatio.lastIndexOf(wh);
		//Accurated check
		if(type >= 0){
			root.defIndex = type;
		}
		//Approx check
		else{
			for(var n = 0; n<WHRatio.length; n++){
				var dif = Math.abs(wh-WHRatio[n]);
				if (dif<=0.1) {
					root.defIndex = n;
				}
			}
		}
		
		
	}


	function onSelFormat(index,name){
		//console.log(index);
		//console.log(name);

		root.defIndex = index;
		setFormatImg("imgDD");

	}

/*
	// Close the dropdown if the user clicks outside of it
	window.onclick = function(event) {
	  if (!event.target.matches('.dropbtn')) {

	    var dropdowns = document.getElementsByClassName("dropdown-content");
	    var i;
	    for (i = 0; i < dropdowns.length; i++) {
	      var openDropdown = dropdowns[i];
	      if (openDropdown.classList.contains('show')) {
	        openDropdown.classList.remove('show');
	      }
	    }
	  }
	}
*/


/*

<select>
  <option id="myOption" value="volvocar">Volvo</option>
  <option value="saabcar">Saab</option>
</select>
*/


	/////////////////////////////////////////////////////////////

	function UpdateRTT(onFinished){
		//var texturezzz = new THREE.TextureLoader().load( "textures/water.jpg", function ( texture ) {
		if(renderer == undefined){
			return false;
		}
		for (var i = 0; i < 6; i++){
			materialRTT.uniforms.nFace.value = i;
			renderer.render( sceneRTT, camRTT, RTTtextures[i], true );
		}

		camCube.updateCubeMap( renderer, sceneCube );
		//console.log(camCube.renderTarget.texture);

		//if(onFinished){console.log("finish");onFinished(camCube.renderTarget.texture);}
		if(onFinished){console.log("finish");onFinished(RTTtextures,camCube.renderTarget.texture);}
	}


	function initRTT() {

		//var container, skyBox;

		//texCube = new THREE.SC_CubeMap(RTTSize);

		camCube = new THREE.CubeCamera( 1, 100000, RTTSize );

		//raycaster = new THREE.Raycaster();


		for ( var i = 0; i < 6; i ++ ) {

			RTTtextures[ i ] = new THREE.WebGLRenderTarget( RTTSize, RTTSize, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );

		}

		sceneRTT = new THREE.Scene();
		sceneCube = new THREE.Scene();
		sceneCube.add( camCube );
		
		//RTT
		/*var TexRTT = new THREE.TextureLoader().load( 'textures/2294472375_24a3b8ef46_o.jpg', function() {
			//UpdateRTT();
		});*/

		var TexRTT = new THREE.Texture();
		//

		// JPEGs can't have an alpha channel, so memory can be saved by storing them as RGB.
		//var isJPEG = url.search( /\.(jpg|jpeg)$/ ) > 0 || url.search( /^data\:image\/jpeg/ ) === 0;

		//TexRTT.format = isJPEG ? RGBFormat : RGBAFormat;
		TexRTT.format = THREE.RGBAFormat;
		TexRTT.image = root.img;
		TexRTT.needsUpdate = true;

		shaderRTT = THREE.ShaderLib[ In_ShaderNames[root.defIndex] ];
		uniformsRTT = THREE.UniformsUtils.clone( shaderRTT.uniforms );
		uniformsRTT.tSampler.value = TexRTT;
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


	}
	

	function activate() {
		if(divModal === undefined){
			loadjscssfile("js/skycube/CSS/SC_InputPanoramaFormatModal.css","css");
		}
		
		checkFormatType();
		setupFormatWindow();
		shown();

	}

	function shown(){
		divModal.style.display = "block";
	}

	function deactivate() {
		divModal.style.display = "none";
		removeElements(divModal);
		document.body.removeChild(divModal);
		//this.enabled = false;
	}

	function dispose() {
		deactivate();
	}

	this.activate = activate;
	this.deactivate = deactivate;
	this.dispose = dispose;

};

