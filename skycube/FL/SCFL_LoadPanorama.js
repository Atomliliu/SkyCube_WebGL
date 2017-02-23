//

SCFL_LoadPanorama = function ( imgFile ) {
	//this.img = imgFile;
	this.enabled = true;

	//var imgWidth = this.img.width;
	//var imgHeight = this.img.height;
	var divModal;

	var root = this;

	this.defIndex = 0;

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

	/*var Out_ShaderNames = [
		"ENV2DP",
		"ENV2HCC",
		"ENV2LL",
		"ENV2SP",
		"ENV2LP",
		"ENV2HCUBE",
		"ENV2VCC",
		"ENV2VCUBE"
	];*/


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

	/*function listDD() {
	    document.getElementById("dropdownList").classList.toggle("show");
	}*/

	function selFormatWindow() {
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
		//buttonDD.setAttribute("class",);
		buttonDD.innerHTML = "Input";
		divDD.appendChild(buttonDD);
		
		//
		divContent.appendChild(span);
		divContent.appendChild(p);
		divContent.appendChild(divDD);
		divModal.appendChild(divContent);

		document.body.appendChild(divModal);

		span.onclick = function() {
		    divModal.style.display = "none";
		}
	}


	function onSelFormat(index,name){
		console.log(index);
		console.log(name);
	}


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



/*

<select>
  <option id="myOption" value="volvocar">Volvo</option>
  <option value="saabcar">Saab</option>
</select>
*/
	

	function activate() {
		loadjscssfile("js/skycube/CSS/SC_InputPanoramaFormatModal.css","css");

		selFormatWindow();
		divModal.style.display = "block";

	}

	function deactivate() {

		//this.enabled = false;
	}

	function dispose() {
		deactivate();
	}

	this.activate = activate;
	this.deactivate = deactivate;
	this.dispose = dispose;

};
