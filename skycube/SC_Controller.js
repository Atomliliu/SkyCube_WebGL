

THREE.SC_Controller = function ( dom, css, width, height ) {
	var root = this;
	this.enabled = true;
	this.controllers = [];
	/* Outermost DOM Element*/
	this.domElement = document.createElement('div');
	dom.appendChild(this.domElement);
	setCSS(this.domElement,css);

	function setCSS(elem, css){
		if(css!=undefined && css!="") elem.setAttribute('class', css);
	}

	function addElement(parentDom, css, elemName, classType, callBack){
		var cb = document.createElement(elemName);
    	cb.setAttribute('type', classType);
    	setCSS(cb,css);

    	if(parentDom==undefined) parentDom = dom;
    	parentDom.appendChild(cb);
    	cb.onchange = callBack;
    	root.controllers.push(cb);
    	return cb;
	}

	this.CheckBox = function (parentDom, css, classType, callBack){
		if (classType==undefined) classType='checkbox';
		return addElement(parentDom, css, "input", classType, callBack);
		
	};

};

THREE.SC_Controller.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.SC_Controller.prototype.constructor = THREE.SC_Controller;
