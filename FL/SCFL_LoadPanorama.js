//

SCFL_LoadPanorama = function ( file ) {
	this.file = file;
	this.enabled = true;

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

};
