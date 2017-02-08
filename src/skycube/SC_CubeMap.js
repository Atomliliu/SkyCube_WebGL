import { Object3D } from '../core/Object3D';
import { WebGLRenderTargetCube } from '../renderers/WebGLRenderTargetCube';
import { LinearFilter, NearestFilter, RGBFormat } from '../constants';
import { Vector3 } from '../math/Vector3';
//import { OrthographicCamera } from '../cameras/OrthographicCamera';

/**
 * Camera for rendering cube maps
 *	- renders scene into axis-aligned cube
 *
 * @author alteredq / http://alteredqualia.com/
 */

function SC_CubeMap( cubeResolution ) {

	Object3D.call( this );

	this.type = 'SC_CubeMap';

	var options = { minFilter: LinearFilter, magFilter: NearestFilter, format: RGBFormat };

	this.renderTarget = new WebGLRenderTargetCube( cubeResolution, cubeResolution, options );

	this.updateCubeMap = function ( renderer, scene, cam, mat, matFace ) {

		if ( this.parent === null ) this.updateMatrixWorld();

		var renderTarget = this.renderTarget;
		var generateMipmaps = renderTarget.texture.generateMipmaps;

		renderTarget.texture.generateMipmaps = false;

		/*if (cam === undefined) {
			cam = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -10000, 10000 );
			cam.position.z = 100;
		}*/
		

		for (var i = 0; i < 6; i++){
			//mat.uniforms.nFace.value = i;
			matFace.value = i;
			renderTarget.activeCubeFace = i;
			renderer.render( scene, cam, renderTarget, true );
			//console.log("RTTtextures["+i+"]"+RTTtextures[i].width);
			//RTTtextures[i].texture.needsUpdate = true;
		}
		//renderTarget.texture.needsUpdate = true;

		renderer.setRenderTarget( null );

	};

}

SC_CubeMap.prototype = Object.create( Object3D.prototype );
SC_CubeMap.prototype.constructor = SC_CubeMap;


export { SC_CubeMap };
