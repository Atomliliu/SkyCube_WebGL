//Loading files

SCFL_LoadFiles = function ( fileList ) {

	this.files = fileList;
	this.enabled = true;

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

	function F


	///////////////////////////////////
	if(this.files.length > 1){
		//Multi files
		return;
	}
	else{
		//Single file
	}
};
