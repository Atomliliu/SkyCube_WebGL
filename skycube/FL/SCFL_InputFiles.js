//Input Page

SCFL_InputFiles = function ( idName, typeName ) {
	var root = this;
	var divInput = document.getElementById(idName);
	//var input;
	var type = "file";
	var loadType = [];
	this.files;
	
	this.enabled = true;
	this.onLoaded = undefined;

	if(typeName != undefined && typeName != ""){
		type2Array();
	}

	var scc = new THREE.SC_Common();


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
		//divInput = document.createElement("div");
		divInput.setAttribute("class", "container");
		var divInputDropText = document.createElement("div");
		divInputDropText.id = "drop_zonetext";
		

		var h1 = document.createElement("h1");
		var textDrop = document.createTextNode("Drop files to upload");
		h1.appendChild(textDrop);
		divInputDropText.appendChild(h1);
		divInput.appendChild(divInputDropText);

		var p = document.createElement("P");
		var textOr = document.createTextNode("OR");
		p.appendChild(textOr);
		divInput.appendChild(p);

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
		divInput.appendChild(label);

		document.body.appendChild(divInput);

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
		if(divInput !== undefined && divInput.id == idName){
			document.getElementById("file").removeEventListener('change', onFileSelect, false );
			scc.removeCildren(divInput);
			//document.body.removeChild(divInput);
			divInput = undefined;

		}
		
		//console.log(idName);

	}

	function shownInputZone(){
		if(divInput !== undefined && divInput.id == idName){
			divInput.style.visibility = "visible";
		}
	}

	function hiddenInputZone(){
		if(divInput !== undefined && divInput.id == idName){
			divInput.style.visibility = "hidden";
		}
	}

	function activate() {
		
		//loadjscssfile("js/skycube/CSS/SC_InputPage.css","css");
		if(divInput === undefined) {divInput = document.getElementById(idName);}
		shownInputZone();
		createInputZone();
		setupFilesType(type);
		root.enabled = true;
	}

	function deactivate() {
		// body...
		//removeEventListener
		removeInputZone();
		hiddenInputZone();
		root.enabled = false;
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

