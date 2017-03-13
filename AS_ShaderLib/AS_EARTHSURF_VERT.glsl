#include <as_common>

varying vec4 vWorldPosition;//? vec3
varying vec2 vUv;
varying vec3 vT0;
varying vec3 vT1;
varying vec3 vC0;
varying vec3 vC1;


// vec3

uniform vec3 v3Translate;		// The objects world pos
uniform vec3 v3LightPos;		// The direction vector to the light source
uniform vec3 v3InvWavelength; // 1 / pow(wavelength, 4) for the red, green, and blue channels
uniform float fOuterRadius;		// The outer (atmosphere) radius
uniform float fOuterRadius2;	// fOuterRadius^2
uniform float fInnerRadius;		// The inner (planetary) radius
uniform float fInnerRadius2;	// fInnerRadius^2
uniform float fKrESun;			// Kr * ESun
uniform float fKmESun;			// Km * ESun
uniform float fKr4PI;			// Kr * 4 * PI
uniform float fKm4PI;			// Km * 4 * PI
uniform float fScale;			// 1 / (fOuterRadius - fInnerRadius)
uniform float fScaleDepth;		// The scale depth (i.e. the altitude at which the atmosphere's average density is found)
uniform float fScaleOverScaleDepth;	// fScale / fScaleDepth
uniform float fHdrExposure;		// HDR exposure


void main() {
	//Vertx 2 Fragment
	vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
	vWorldPosition = worldPosition.xyzw;//? vec3

	vUv = abs(vUvFlip-uv);
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

	//////////////////////////////////////////////////////////////////////////////

	//vec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );

	vec3 v3CameraPos = cameraPosition - v3Translate;	// The camera's current position
	float fCameraHeight = length(v3CameraPos);					// The camera's current height
	float fCameraHeight2 = fCameraHeight*fCameraHeight;			// fCameraHeight^2
	
	// Get the ray from the camera to the vertex and its length (which is the far point of the ray passing through the atmosphere)
	//vec3 v3Pos = mul(_Object2World, v.vertex).xyz - v3Translate;
	vec3 v3Pos = vWorldPosition.xyz - v3Translate;
	vec3 v3Ray = v3Pos - v3CameraPos;
	float fFar = length(v3Ray);
	v3Ray /= fFar;
	
	// Calculate the closest intersection of the ray with the outer atmosphere (which is the near point of the ray passing through the atmosphere)
	float fNear = getNearIntersection(v3CameraPos, v3Ray, fCameraHeight2, fOuterRadius2);
	vec3 v3Start = v3CameraPos;
	float fHeight;
	float fDepth;
	float fCameraAngle;
	float fLightAngle;


}



//AS3 Planet Generator
//Modified by Sean O'Neil's shader in GPU GEM2
//Copyright (c) 2014 Atom's Dev

Shader "AS3/PlanetSurface_SM2" 
{
	Properties {
		_MainTex ("Base (RGBA)", 2D) = "black" {}   //Alpha for specular intensity
		_CloudTex ("Cloud (RGBA)", 2D) = "black" {}
		_Ratio("Ratio",Range (0.0, 1.0)) = 0.25
		_ESun("ESun",Float) = 1
		_Glossiness("Glossiness",Range (0.0, 1.0)) = 0.35

		_CloudUOffset ("Cloud Moving",Float) = 0
	}
	SubShader 
	{
		Tags { "RenderType"="Opaque" }
    	Pass 
    	{
    		
			CGPROGRAM
			#include "UnityCG.cginc"
			#include "AS3_Common.cginc"
			#pragma target 3.0
			//#pragma glsl
			#pragma vertex vert
			#pragma fragment frag
			
			sampler2D _MainTex;
			sampler2D _CloudTex;
			float _ESun;
			float _Ratio;
			float _Glossiness;
			float _CloudUOffset;
			
			uniform float3 v3Translate;		// The objects world pos
			uniform float3 v3LightPos;		// The direction vector to the light source
			uniform float3 v3InvWavelength; // 1 / pow(wavelength, 4) for the red, green, and blue channels
			uniform float fOuterRadius;		// The outer (atmosphere) radius
			uniform float fOuterRadius2;	// fOuterRadius^2
			uniform float fInnerRadius;		// The inner (planetary) radius
			uniform float fInnerRadius2;	// fInnerRadius^2
			uniform float fKrESun;			// Kr * ESun
			uniform float fKmESun;			// Km * ESun
			uniform float fKr4PI;			// Kr * 4 * PI
			uniform float fKm4PI;			// Km * 4 * PI
			uniform float fScale;			// 1 / (fOuterRadius - fInnerRadius)
			uniform float fScaleDepth;		// The scale depth (i.e. the altitude at which the atmosphere's average density is found)
			uniform float fScaleOverScaleDepth;	// fScale / fScaleDepth
			uniform float fHdrExposure;		// HDR exposure
		
			struct v2f 
			{
    			float4 pos : SV_POSITION;
    			float2 uv : TEXCOORD0;
    			float3 t0 : TEXCOORD1;
    			float3 t1 : TEXCOORD2;
    			float3 c0 : COLOR0;
    			float3 c1 : COLOR1;
			};
			

			v2f vert(appdata_base v)
			{
			    float3 v3CameraPos = _WorldSpaceCameraPos - v3Translate;	// The camera's current position
				float fCameraHeight = length(v3CameraPos);					// The camera's current height
				float fCameraHeight2 = fCameraHeight*fCameraHeight;			// fCameraHeight^2
				
				// Get the ray from the camera to the vertex and its length (which is the far point of the ray passing through the atmosphere)
				float3 v3Pos = mul(_Object2World, v.vertex).xyz - v3Translate;
				float3 v3Ray = v3Pos - v3CameraPos;
				float fFar = length(v3Ray);
				v3Ray /= fFar;
				
				// Calculate the closest intersection of the ray with the outer atmosphere (which is the near point of the ray passing through the atmosphere)
				float fNear = getNearIntersection(v3CameraPos, v3Ray, fCameraHeight2, fOuterRadius2);
				float3 v3Start = v3CameraPos;
				float fHeight;
				float fDepth;
				float fCameraAngle;
				float fLightAngle;

				if(fNear <= 0)//Camera inside atmosphere
				{
					fDepth = exp((fInnerRadius - fCameraHeight) * (1.0/fScaleDepth));
					//fDepth = exp((fInnerRadius - fOuterRadius) / fScaleDepth);
					fCameraAngle = dot(-v3Ray, v3Pos) / length(v3Pos);
					fLightAngle = dot(v3LightPos, v3Pos) / length(v3Pos);
				}
				else//Camera outside atmosphere
				{
					v3Start = v3CameraPos + v3Ray * fNear;
					fFar -= fNear;
					fDepth = exp((fInnerRadius - fOuterRadius) / fScaleDepth);
					//fDepth = exp((fInnerRadius - fCameraHeight) * (1.0/fScaleDepth));
					fCameraAngle = dot(-v3Ray, v3Pos) / length(v3Pos);
					fLightAngle = dot(v3LightPos, v3Pos) / length(v3Pos);
				}
				
				// Calculate the ray's starting position, then calculate its scattering offset
				
				float fCameraScale = scale(fCameraAngle,fScaleDepth);
				float fLightScale = scale(fLightAngle,fScaleDepth);
				float fCameraOffset = fDepth*fCameraScale;
				float fTemp = (fLightScale + fCameraScale);
				
				const float fSamples = 2.0;
				
				// Initialize the scattering loop variables
				float fSampleLength = fFar / fSamples;
				float fScaledLength = fSampleLength * fScale;
				float3 v3SampleRay = v3Ray * fSampleLength;
				float3 v3SamplePoint = v3Start + v3SampleRay * 0.5;
				
				// Now loop through the sample rays
				float3 v3FrontColor = float3(0.0, 0.0, 0.0);
				float3 v3Attenuate;
				for(int i=0; i<int(fSamples); i++)
				{
					float fHeight = length(v3SamplePoint);
					float fDepth = exp(fScaleOverScaleDepth * (fInnerRadius - fHeight));
					float fScatter = fDepth*fTemp - fCameraOffset;
					v3Attenuate = exp(-fScatter * (v3InvWavelength * fKr4PI + fKm4PI));
					v3FrontColor += v3Attenuate * (fDepth * fScaledLength);
					v3SamplePoint += v3SampleRay;
				}
				
    			v2f OUT;
    			OUT.pos = mul(UNITY_MATRIX_MVP, v.vertex);
    			OUT.uv = v.texcoord.xy;
    			OUT.c0 = v3FrontColor * (v3InvWavelength * fKrESun + fKmESun);
    			OUT.c1 = lerp(1, v3Attenuate, _Ratio);
    			OUT.t0 = pow(saturate(dot(v3LightPos, mul((float3x3)_Object2World, v.normal).xyz)+0.175),0.75);

    			//Specular
				half3 h = normalize (v3LightPos + normalize(v3CameraPos - v3Pos));
    			half nh = max (0, dot (v.normal, h));
    			float spec = pow (nh, _Glossiness * A_SPECPOWER);
    			OUT.t1 = spec;
    			
    			return OUT;
			}
			
			half4 frag(v2f IN) : COLOR
			{
				half4 texSurfCol = tex2D(_MainTex, IN.uv);
				half4 texCloudCol = tex2D(_CloudTex, float2(IN.uv.x + _CloudUOffset * _Time.x, IN.uv.y));
				float diff = IN.t0 * IN.c1 * _ESun;
				float3 col = texSurfCol.rgb * diff * 0.7;
				col += IN.t1 * diff * 0.3 * texSurfCol.a;
				col = IN.c0 + lerp(col.rgb, texCloudCol.rgb * diff, texCloudCol.a);
				

				float4 fColor = float4(col, 1);
				fColor.rgb *= SetEV(fHdrExposure);
				return fColor;
			}
			
			ENDCG

    	}
	}
}
