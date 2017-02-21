//Loading files

SCFL_LoadFiles = function ( fileList, fileExtList ) {

	var root = this;
	this.files = fileList;
	this.enabled = true;

	var filesType = [];

	if (fileList!=undefined && fileList.length > 0){
		if(fileExtList!=undefined && fileList.length == fileExtList.length){
			filesType = fileExtList;
		}
		else{
			for(var i=0;i<fileList.length;i++){
				var fileExt = fileList.name.split(".");

				filesType[i] = fileExt[fileExt.length - 1];
			}
		}
		
	}
	else{
		return false;
	}

	if(fileList.length > 1){
		//
	}
	else //Single file
	{
		var f = fileList[0];

	}

	function checkCompatible(){
		// Check for the various File API support.
		if (window.File && window.FileReader && window.FileList && window.Blob) {
		  // Great success! All the File APIs are supported.
		  return true;
		} 
		else {
		  alert('The File APIs are not fully supported in this browser.');
		  return false;
		}
		return false;
	}


	function activate() {

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

	


	///////////////////////////////////
	if(this.files.length > 1){
		//Multi files
		return;
	}
	else{
		//Single file
	}
};
