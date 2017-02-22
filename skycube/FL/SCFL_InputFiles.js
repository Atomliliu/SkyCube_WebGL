//Input Page

SCFL_InputFiles = function ( idName, typeName ) {
	var root = this;
	var div = document.getElementById(idName);
	//var input;
	var type = "file";
	var loadType = [];
	this.files;
	
	this.enabled = true;
	this.onLoaded = undefined;

	if(typeName != undefined && typeName != ""){
		type2Array();
	}

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

	//Move it to THREE
	function type2Array(){
		loadType = typeName.split(",");
	}


	//Move it to THREE
	function checkTypeAvailable( fileCheck, fileTypeArray ){
		var fileExt = fileCheck.name.split(".");

		var fe = fileTypeArray.indexOf("." + fileExt[fileExt.length - 1]);
		//console.log(fileExt[fileExt.length - 1]);
		if (fe >= 0) {return true;}
		else {return false;}
	}

	//Move it to THREE
	function checkTypeAvailableInFiles( filesArray, fileTypeArray ){
		for (var i = 0; i< filesArray.length; i++) {
	    	var f = filesArray[i];
	    	
	    	if (checkTypeAvailable(f,fileTypeArray)){
	    		return true;
	    	}
	    }
	    return false;
	}

	//var buttonCSS = new THREE.SC_Common();
	//buttonCSS.loadjscssfile("../CSS/SC_InputPage.css","css");
	
	

	function createInputZone(){
		//div = document.createElement("div");
		div.setAttribute("class", "container");
		var divDropText = document.createElement("div");
		divDropText.id = "drop_zonetext";
		

		var h1 = document.createElement("h1");
		var textDrop = document.createTextNode("Drop files to upload");
		h1.appendChild(textDrop);
		divDropText.appendChild(h1);
		div.appendChild(divDropText);

		var p = document.createElement("P");
		var textOr = document.createTextNode("OR");
		p.appendChild(textOr);
		div.appendChild(p);

		var label = document.createElement("label");
		label.setAttribute("class", "button buttonLoad");
		

		var input = document.createElement("input");
		input.type=type;
		input.id="file";
		input.required = true;

		var span = document.createElement("SPAN");
		var textButton = document.createTextNode("Input Image");
		span.appendChild(textButton);
		label.appendChild(input);
		label.appendChild(span);
		div.appendChild(label);

		document.body.appendChild(div);

		label.addEventListener('change', onFileSelect, false );
	}

	function setupFilesType( idName ){
		document.getElementById(idName).setAttribute("accept", typeName);
	}

	function onFileSelect(event) {
		root.files = event.target.files; // FileList object
		if(loadType.length >= 1){
			
		    if(checkTypeAvailableInFiles(root.files, loadType)){
		    	if(root.onLoaded) {root.onLoaded();}
	    		//if(cbFunc) {
	    		//	cbFunc(root.files);
	    		//}
	    		//console.log("good");
	    	}
			else{
				//Alert Window for Filr type
				//console.log("file type not supported!");
			}
		}
	}

	function removeInputZone(){
		if(div !== undefined && div.id === "_DropZone"){
			document.getElementById("file").removeEventListener('change', onFileSelect, false );
			document.body.removeChild(div);
			div = undefined;
		}
	}

	function shownInputZone(){
		if(div !== undefined && div.id === "_DropZone"){
			//document.getElementById("file").addEventListener('change', onFileSelect, false );
			//document.body.removeChild(div);
			//div = undefined;
			div.style.display = true;
		}
	}

	function hiddenInputZone(){
		if(div !== undefined && div.id === "_DropZone"){
			//document.getElementById("file").removeEventListener('change', onFileSelect, false );
			//document.body.removeChild(div);
			//div = undefined;
			div.style.display = false;
		}
	}

	function activate() {
		loadjscssfile("js/skycube/CSS/SC_InputPage.css","css");
		createInputZone();
		setupFilesType(type);
	}

	function deactivate() {
		// body...
		//removeEventListener
		removeInputZone();
	}

	function shown() {
		// body...
		//removeEventListener
		shownInputZone();
	}

	function hidden() {
		// body...
		//removeEventListener
		hiddenInputZone();
	}

	function dispose() {
		deactivate();
	}

	this.activate = activate;
	this.deactivate = deactivate;
	this.dispose = dispose;
	this.hidden = hidden;
	this.shown = shown;

};

