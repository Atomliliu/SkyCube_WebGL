

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

	function addElement(parentDom, css, elemName, classType, value, id, eventID, callBack){
		var cb = document.createElement(elemName);
    	cb.setAttribute('type', classType);
    	setCSS(cb,css);
    	cb.value = value;

    	if(id!=undefined && id!="" && id!=false) cb.id = id;

    	if(parentDom==undefined) parentDom = dom;
    	parentDom.appendChild(cb);
    	if (eventID==0) cb.onchange = callBack;
    	if (eventID==1) cb.onclick = callBack;
    	root.controllers.push(cb);
    	return cb;
	}

	this.addCheckBox = function (parentDom, css, value, id, callBack){
		return addElement(parentDom, css, "input", 'checkbox', value, id, 0, callBack);
		
	};

	/*this.addCheckBoxLabeled = function (parentDom, css, value, id, text, callBack){
		root.addLabel(parentDom, css, id, text);
		return addElement(parentDom, css, "input", 'checkbox', value, id, 0, callBack);
		
	};*/

	this.addButton = function (parentDom, css, value, id, callBack){
		return addElement(parentDom, css, "input", 'button', value, id, 1, callBack);
		
	};

	this.addRadio = function (parentDom, css, value, id, callBack){
		return addElement(parentDom, css, "input", 'radio', value, id, 0, callBack);
		
	};

	this.addNumber = function (parentDom, css, value, id, callBack){
		return addElement(parentDom, css, "input", 'number', value, id, 0, callBack);
		
	};

	this.addRange = function (parentDom, css, value, id, callBack){
		return addElement(parentDom, css, "input", 'range', value, id, 0, callBack);
		
	};

	this.addText = function (parentDom, css, value, id, callBack){
		return addElement(parentDom, css, "input", 'text', value, id, 0, callBack);
		
	};

	this.addLabel = function (parentDom, css, bound, text){
		var lb = document.createElement('label');
    	if(bound!=undefined && bound!="" && bound!=false) lb.setAttribute('for', bound);
    	setCSS(lb,css);
    	lb.innerHTML = text;

    	if(parentDom==undefined) parentDom = dom;
    	parentDom.appendChild(lb);
    	root.controllers.push(lb);
    	return lb;
	};



};

THREE.SC_Controller.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.SC_Controller.prototype.constructor = THREE.SC_Controller;
