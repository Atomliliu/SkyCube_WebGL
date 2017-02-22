//Input Page

SCFL_InputFiles = function ( idName, typeName ) {
	var root = this;
	var div = document.getElementById(idName);
	this.files;
	
	this.enabled = true;

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
		input.type="file";
		input.id="file";
		input.required = true;

		var span = document.createElement("SPAN");
		var textButton = document.createTextNode("Input Image");
		span.appendChild(textButton);
		label.appendChild(input);
		label.appendChild(span);
		div.appendChild(label);

		document.body.appendChild(div);
	}

	function activate() {
		loadjscssfile("js/skycube/CSS/SC_InputPage.css","css");
		createInputZone();
	}

	function deactivate() {
		// body...
	}

	function dispose() {
		deactivate();
	}

	this.activate = activate;
	this.deactivate = deactivate;
	this.dispose = dispose;

};
