import { SC_ShaderChunk } from './SC_ShaderChunk';
import { UniformsUtils } from './UniformsUtils';
import { Vector3 } from '../../math/Vector3';
import { UniformsLib } from './UniformsLib';
import { Color } from '../../math/Color';

/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 */

var SC_ShaderLib = {

	LL2CUBE: {

		//uniforms: UniformsUtils.merge( [

			//UniformsLib.sc_common,
			//UniformsLib.aomap,
			//UniformsLib.fog

		//] ),

		uniforms: {
			tSampler: { value: null },
			nFace: { value: 0 }
		},

		vertexShader: SC_ShaderChunk.SCSL_LL2CUBE_VERT,
		fragmentShader: SC_ShaderChunk.SCSL_LL2CUBE_FRAG

	}
};


export { SC_ShaderLib };
