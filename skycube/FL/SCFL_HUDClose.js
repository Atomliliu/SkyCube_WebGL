//

SCFL_HUDClose = function ( idname ) {

	this.enabled = false;

	var root = this;
	var scc = new THREE.SC_Common();
	var div;

	this.onClick;


	function setupCloseIcon() {
		var body;
		if(idname !== undefined && idname != ""){
			body = document.getElementById(idName)
		}
		else{
			body = document.body;
		}
		div = document.createElement("div");
		div.id = "_close";
		div.setAttribute("class", "close-global");

		var span = document.createElement("span");
		span.setAttribute("class", "close");
		var closeIcon = document.createTextNode("\xD7");
		span.appendChild(closeIcon);

		div.appendChild(span);

		body.appendChild(div);

		span.onclick = function() {
			root.deactivate();
		    if(root.onClick) {root.onClick()};
		};
	}


	

	function activate() {
		this.enabled = true;
		setupCloseIcon();
		shown();

	}

	function shown(){
		div.style.display = "block";
	}

	function hide(){
		div.style.display = "none";
	}

	function deactivate() {
		div.style.display = "none";
		scc.removeElements(div);
		document.body.removeChild(div);
		this.enabled = false;
	}

	function dispose() {
		deactivate();
	}

	this.activate = activate;
	this.deactivate = deactivate;
	this.dispose = dispose;

};

