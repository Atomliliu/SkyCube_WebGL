import { Object3D } from '../core/Object3D';
import { WebGLRenderTargetCube } from '../renderers/WebGLRenderTargetCube';
import { LinearFilter, NearestFilter, RGBFormat, RGBAFormat } from '../constants';
import { Vector3 } from '../math/Vector3';
import { PerspectiveCamera } from '../cameras/PerspectiveCamera';

/**
 * Camera for rendering cube maps
 *	- renders scene into axis-aligned cube
 *
 * @author alteredq / http://alteredqualia.com/
 */

function SC_CubeCamera( near, far, cubeResolution ) {

	Object3D.call( this );

	this.type = 'SC_CubeCamera';

	var fov = 90, aspect = 1;

	//this.cameraCube = [];

	var cameraPX = new PerspectiveCamera( fov, aspect, near, far );
	cameraPX.up.set( 0, - 1, 0 );
	cameraPX.lookAt( new Vector3( 1, 0, 0 ) );
	this.add( cameraPX );

	var cameraNX = new PerspectiveCamera( fov, aspect, near, far );
	cameraNX.up.set( 0, - 1, 0 );
	cameraNX.lookAt( new Vector3( - 1, 0, 0 ) );
	this.add( cameraNX );

	var cameraPY = new PerspectiveCamera( fov, aspect, near, far );
	cameraPY.up.set( 0, 0, 1 );
	cameraPY.lookAt( new Vector3( 0, 1, 0 ) );
	this.add( cameraPY );

	var cameraNY = new PerspectiveCamera( fov, aspect, near, far );
	cameraNY.up.set( 0, 0, - 1 );
	cameraNY.lookAt( new Vector3( 0, - 1, 0 ) );
	this.add( cameraNY );

	var cameraPZ = new PerspectiveCamera( fov, aspect, near, far );
	cameraPZ.up.set( 0, - 1, 0 );
	cameraPZ.lookAt( new Vector3( 0, 0, 1 ) );
	this.add( cameraPZ );

	var cameraNZ = new PerspectiveCamera( fov, aspect, near, far );
	cameraNZ.up.set( 0, - 1, 0 );
	cameraNZ.lookAt( new Vector3( 0, 0, - 1 ) );
	this.add( cameraNZ );

	this.cameraCube = [cameraPX,cameraNX,cameraPY,cameraNY,cameraPZ,cameraNZ];
	var options = { format: RGBFormat, magFilter: LinearFilter, minFilter: LinearFilter };

	this.renderTarget = new WebGLRenderTargetCube( cubeResolution, cubeResolution, options );

	this.updateCubeMap = function ( renderer, scene ) {

		if ( this.parent === null ) this.updateMatrixWorld();

		var renderTarget = this.renderTarget;
		//var generateMipmaps = renderTarget.texture.generateMipmaps;

		renderTarget.texture.generateMipmaps = false;

		renderTarget.activeCubeFace = 0;
		renderer.clearTarget (renderTarget, true, true, true);
		renderer.render( scene, cameraPX, renderTarget );

		renderTarget.activeCubeFace = 1;
		renderer.clearTarget (renderTarget, true, true, true);
		renderer.render( scene, cameraNX, renderTarget );

		renderTarget.activeCubeFace = 2;
		renderer.clearTarget (renderTarget, true, true, true);
		renderer.render( scene, cameraPY, renderTarget );

		renderTarget.activeCubeFace = 3;
		renderer.clearTarget (renderTarget, true, true, true);
		renderer.render( scene, cameraNY, renderTarget );

		renderTarget.activeCubeFace = 4;
		renderer.clearTarget (renderTarget, true, true, true);
		renderer.render( scene, cameraPZ, renderTarget );

		//renderTarget.texture.generateMipmaps = generateMipmaps;
		renderTarget.activeCubeFace = 5;
		renderer.clearTarget (renderTarget, true, true, true);
		renderer.render( scene, cameraNZ, renderTarget );

		renderer.setRenderTarget( null );
	};

	this.updateCubeMapByFrame = function ( renderer, scene, frameCount ) {

		if ( this.parent === null ) this.updateMatrixWorld();

		var renderTarget = this.renderTarget;
		//var generateMipmaps = renderTarget.texture.generateMipmaps;

		renderTarget.texture.generateMipmaps = false;

		var faceToRender = frameCount%6;
		renderTarget.activeCubeFace = faceToRender;
		renderer.clearTarget (renderTarget, true, true, true);
		renderer.render( scene, root.cameraCube[faceToRender], renderTarget );

		renderer.setRenderTarget( null );
	};

}

SC_CubeCamera.prototype = Object.create( Object3D.prototype );
SC_CubeCamera.prototype.constructor = SC_CubeCamera;


export { SC_CubeCamera };
