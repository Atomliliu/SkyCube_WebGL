#define A_PI		3.14159265358 //3.1415926535897932384626433832795
#define A_1D_PI		0.31830988618 //0.31830988618379067153776752674503
#define A_1D6		0.166666666667 //0.16666666666666666666666666666667
#define A_2D6		0.333333333333 //0.33333333333333333333333333333333
#define A_3D6		0.5
#define A_4D6		0.666666666667 //0.66666666666666666666666666666667
#define A_5D6		0.833333333333 //0.83333333333333333333333333333333




////////////////////////////////////////////////////////////////////////////

vec3 getVec(vec2 UV, int face){

    highp vec3 VEC;
    UV.x = UV.x * 2.0 - 1.0; // Range to -1 to 1
    UV.y = UV.y * 2.0 - 1.0; // Range to -1 to 1

    if(face == 0){ //PositiveX	 Right facing side (+x).
		VEC = vec3(1.0,UV.y,-UV.x);
	}

	else if(face == 1){ //NegativeX	 Left facing side (-x).
		VEC = vec3(-1.0,UV.y,UV.x);
	}

	else if(face == 2){ //PositiveY	 Upwards facing side (+y).
		VEC = vec3(UV.x,1.0,-UV.y);
	}

	else if(face == 3){ //NegativeY	 Downward facing side (-y).
		VEC = vec3(UV.x,-1.0,UV.y);
	}

	else if(face == 4){ //PositiveZ	 Forward facing side (+z).
		VEC = vec3(UV.x,UV.y,1.0);
	}

	else if(face == 5){ //NegativeZ	 Backward facing side (-z).
		VEC = vec3(-UV.x,UV.y,-1.0);
	}

	else{
		VEC = vec3(0.0,0.0,1.0);
	}

    return normalize(VEC);
}

vec3 getVecHorizonCubeMap(vec2 UV){
	vec2 UV2 = UV;
	//UV2.x = clamp(UV2.x,0.0,1.0);
	//UV2.y = clamp(UV2.y,0.0,1.0);
	UV2 = clamp(UV2,0.0,1.0);
	UV2.x *= 6.0;
	float face = floor(UV.x*6.0);

	UV2.x = clamp(UV2.x - face,0.0,1.0);
	return getVec(UV2,int(face));
	
}



vec2 getLLMapping_VEC2UV(vec3 vec) //Use for create LP map",
{
	vec2 UV;

	UV.y = acos(-vec.y) * A_1D_PI; // y = 1 to -1, v = 0 to PI,

	float P = abs(vec.x/vec.z);
	//float O = 0.0f;

	if (vec.x >= 0.0) {
		if(vec.z == 0.0) {
			UV.x = 0.5;
		}
		else if(vec.z < 0.0) {
			UV.x = (A_PI - atan(P)) * A_1D_PI;
		}
		else {
			UV.x = atan(P) * A_1D_PI;
		}

	}
	else { // X < 0  //phase
		if(vec.z == 0.0) {
			UV.x = -0.5;
		}
		else if(vec.z < 0.0) {
			UV.x = -(A_PI - atan(P)) * A_1D_PI;
		}
		else {
			UV.x = -atan(P) * A_1D_PI;
		}
	}

	UV.x = (UV.x + 1.0) * 0.5;

	return vec2(UV);
}

