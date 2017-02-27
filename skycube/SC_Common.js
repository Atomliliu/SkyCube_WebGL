//
THREE.SC_Common = function() {

	//File Type Array with dot, ext .jpg .png .tif .tga
	function checkTypeAvailable( fileCheck, fileTypeArray ){
		var fileExt = fileCheck.name.split(".");

		var fe = fileTypeArray.indexOf("." + fileExt[fileExt.length - 1]);
		//console.log(fileExt[fileExt.length - 1]);
		if (fe >= 0) {return true;}
		else {return false;}
	}

	function checkTypeAvailableInFiles( filesArray ){
		for (var i = 0; i< filesArray.length; i++) {
	    	var f = filesArray[i];
	    	
	    	if (checkTypeAvailable(f)){
	    		return true;
	    	}
	    }
	    return false;
	}

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


	function checkloadjscssfile(filename, filetype){
	    if (filesadded.indexOf("["+filename+"]")==-1){
	        loadjscssfile(filename, filetype)
	        filesadded+="["+filename+"]" //List of files added in the form "[filename1],[filename2],etc"
	    }
	    else
	        alert("file already added!")
	}


	function removeElements(elements) {
	  for (var i=0; i<elements.length; i++) {
	    elements[i].parentNode.removeChild(elements[i]);
	  }
	}


};

THREE.SC_Common.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.SC_Common.prototype.constructor = THREE.SC_Common;
//export{SCFL_Common};
