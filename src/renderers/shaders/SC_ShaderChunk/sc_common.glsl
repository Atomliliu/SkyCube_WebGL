//Texture coordination (0,0) is bottom left

#define SC_PI		3.14159265358 
#define SC_1D_PI		0.31830988618 

#define SC_1D6		0.166666666667 
#define SC_2D6		0.333333333333 
#define SC_3D6		0.5
#define SC_4D6		0.666666666667
#define SC_5D6		0.833333333333

#define SC_1D4		0.25
#define SC_3D4		0.75


//const int SC_HC_FaceX[4] = int[4](1,4,0,5);
//const int SC_HC_FaceY[3] = int[3](2,4,3);

highp float steps[5];// = {0,1,2,3,4};

////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////
/////////////////////UV to Vector//////////////////////////

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

//Split CubeMap
vec3 getVecSplitCubeMap(vec2 UV, int face, int mode){
	vec2 UV2 = UV;
	UV2 = clamp(UV2,0.0,1.0);

	if(mode >= 1){
		UV2.x = 1.0 - UV2.x;
	}

	return getVec(UV2,face);
	
}

//Horizon Linear CubeMap
vec3 getVecHorizonCubeMap(vec2 UV, int mode){
	vec2 UV2 = UV;
	//UV2.x = clamp(UV2.x,0.0,1.0);
	//UV2.y = clamp(UV2.y,0.0,1.0);
	UV2 = clamp(UV2,0.0,1.0);
	UV2.x *= 6.0;
	float face = floor(UV2.x);

	UV2.x = clamp(UV2.x - face,0.0,1.0);
	if(mode >= 1){
		UV2.x = 1.0 - UV2.x;
	}
	return getVec(UV2,int(face));
	
}

//Vertical Linear CubeMap
vec3 getVecVerticalCubeMap(vec2 UV, int mode){
	vec2 UV2 = UV;
	UV2 = clamp(UV2,0.0,1.0);
	UV2.y = (1.0-UV2.y)*6.0; //Upside down
	float face = floor(UV2.y);

	UV2.y = clamp(UV2.y - face,0.0,1.0);
	if(mode >= 1){
		UV2.x = 1.0 - UV2.x;
	}
	return getVec(UV2,int(face));
}

//Horizon Cross CubeMap
vec3 getVecHCrossCubeMap(vec2 UV, int mode){
	//int SC_HC_FaceX[4];// = {1,4,0,5};
	//const int SC_HC_FaceY[3] = int[3](2,4,3);
	vec2 UV2 = UV;
	UV2 = clamp(UV2,0.0,1.0);

	UV2.x *= 4.0;
	UV2.y *= 3.0;

	float faceX = floor(UV2.x);
	float faceY = floor(UV2.y);

	UV2.x = clamp(UV2.x - faceX,0.0,1.0);
	UV2.y = clamp(UV2.y - faceY,0.0,1.0);
	if(mode >= 1){
		UV2.x = 1.0 - UV2.x;
	}

	if (faceX == 0.0 && faceY == 1.0) {
		return getVec(UV2,1);
	}
	else if (faceX == 1.0) {
		if (faceY == 0.0) {
			return getVec(UV2,3);
		}
		else if (faceY == 2.0) {
			return getVec(UV2,2);
		}
		else {
			return getVec(UV2,4);
		}
		//return getVec(UV2,SC_HC_FaceY[faceY]);
		//return vec3(0,0,0);
	}
	else if (faceX == 2.0 && faceY == 1.0) {
		return getVec(UV2,0);
	}
	else if (faceX == 3.0 && faceY == 1.0) {
		return getVec(UV2,5);
	}

	return vec3(0.0,0.0,0.0);
}

//Vertical Cross CubeMap
vec3 getVecVCrossCubeMap(vec2 UV, int mode){
	vec2 UV2 = UV;
	UV2 = clamp(UV2,0.0,1.0);

	UV2.x *= 3.0;
	UV2.y *= 4.0;

	float faceX = floor(UV2.x);
	float faceY = floor(UV2.y);

	UV2.x = clamp(UV2.x - faceX,0.0,1.0);
	UV2.y = clamp(UV2.y - faceY,0.0,1.0);
	if(mode >= 1){
		UV2.x = 1.0 - UV2.x;
	}

	if (faceX == 0.0 && faceY == 2.0) {
		
		return getVec(UV2,1);
	}
	else if (faceX == 1.0) {
		if (faceY == 0.0) {
			return getVec(UV2,5);
		}
		else if (faceY == 1.0) {
			return getVec(UV2,3);
		}
		else if (faceY == 2.0) {
			return getVec(UV2,4);
		}
		else {
			return getVec(UV2,2);
		}
		//return getVec(UV2,SC_HC_FaceY[faceY]);
		//return vec3(0,0,0);
	}
	else if (faceX == 2.0 && faceY == 2.0) {
		return getVec(UV2,0);
	}

	return vec3(0.0,0.0,0.0);

}

//LatLong CubeMap (Latitude/Longitude)
vec3 getVecLLCubeMap(vec2 UV, int mode){
	vec3 VEC;
	float uval;
	if(mode >= 1){
		uval = 2.0 * SC_PI * (1.0 - UV.x);
	}
	else{
		uval = 2.0 * SC_PI * (UV.x);
	}

	float vval = SC_PI * (UV.y);

	VEC.x = -sin(uval)*sin(vval);
	VEC.y = -cos(vval);
	VEC.z = -(sin(vval)*cos(uval));

	return VEC;

}

//Light Probe CubeMap (Angular)
vec3 getVecLPCubeMap(vec2 UV, int mode){
	vec3 VEC;
	if(mode >= 1){
		UV.x = 1.0 - UV.x;
	}
	UV = UV * 2.0 - 1.0; // Range to -1 to 1

	float lr = sqrt(UV.x * UV.x + UV.y * UV.y);
	if(lr == 0.0){
		VEC.x = 0.0;
		VEC.y = 0.0;
		VEC.z = 1.0;
	}
	else if(lr<=1.0){
		float la = SC_PI * lr; // 0-1 to range 0-Pi
		float th = sin(la);
		VEC.x = (UV.x/lr)*th;
		VEC.y = (UV.y/lr)*th;
		VEC.z = cos(la);
	}
	else{//Back
		VEC.x = 0.0;
		VEC.y = 0.0;
		VEC.z = -1.0;
	}

	return VEC;

}


//Dual-Paraboloid CubeMap (Hemispheres)
vec3 getVecDPCubeMap(vec2 UV, int mode){
	float A;
	vec3 vec;
	if(UV.x < 0.5){
		UV.x = UV.x * 2.0;
		if(mode >= 1){ //sky to cube
			UV.x = (1.0 - UV.x);
		}
		UV = UV * 2.0 - 1.0; // Range from 0 to 1 to 1 to -1 (since in unity UV is invert by directX UV)
		UV *= 1.2;
		A = UV.x * UV.x + UV.y * UV.y + 1.0;
		vec = vec3(2.0*UV.x,2.0*UV.y,(A-2.0)); // -1+s^2+t^2 = A-2
		return (vec/A);
	}
	else {
		UV.x = UV.x * 2.0 - 1.0;
		if(mode >= 1){ //sky to cube
			UV.x = (1.0 - UV.x);
		}
		UV = UV * 2.0 - 1.0; // Range from 0 to 1 to 1 to -1 (since in unity UV is invert by directX UV)
		UV *= 1.2;
		A = UV.x * UV.x + UV.y * UV.y + 1.0;
		vec = vec3(2.0*UV.x,-2.0*UV.y,(A-2.0)); // -1+s^2+t^2 = A-2
		return (-vec/A);
	}

}




//Spherical Mirrored Probe Cubemap (360x360 degrees) / AKA Matcap
vec3 getVecSPCubeMap(vec2 UV, int mode){
	vec3 VEC;
	if(mode >= 1){
		UV.x = 1.0 - UV.x;
	}
	UV = UV * 2.0 - 1.0; // Range to -1 to 1

	//Sin 2th == 2 * sin th * cos th == 2 * lr * z

	float lr2 = UV.x * UV.x + UV.y * UV.y;
	float lr = sqrt(lr2);
	float z = sqrt(1.0-lr2);
	//vec2 xy_lr = vec2(UV.x/lr,UV.y/lr);
	//float vec_Lr = 2.0 * lr * z;

	if(lr == 0.0){
		VEC.x = 0.0;
		VEC.y = 0.0;
		VEC.z = 1.0;
	}

	else if(lr<=1.0){
		//xy_lr * vec_Lr == UV/lr * 2.0 * lr * z == UV*2.0*z
		VEC.x = UV.x*2.0*z;//xy_lr.x * vec_Lr;
		VEC.y = UV.y*2.0*z;//xy_lr.y * vec_Lr;
		VEC.z = 1.0 - 2.0*lr2;
	}
	else{//Back
		VEC.x = 0.0;
		VEC.y = 0.0;
		VEC.z = -1.0;
	}


	return VEC;

}



///////////////////////////////////////////////////////////
/////////////////////Vector to UV//////////////////////////
vec2 getHCMapping_Cube(int face, vec2 uv, int mode)
{
	vec2 UV = vec2(0.0);
	UV.x = uv.x*SC_1D4;
	UV.y = uv.y*SC_2D6;

	if(face == 0){//+X
		UV.x = UV.x+SC_3D6;
		UV.y = UV.y+SC_2D6;
	}
	else if(face == 1){//-X
		//UV.x = UV.x;
		UV.y = UV.y+SC_2D6;
	}
	else if(face == 2){//+Y
		UV.x = UV.x+SC_1D4;
		UV.y = UV.y+SC_4D6;
	}
	else if(face == 3){//-Y
		UV.x = UV.x+SC_1D4;
		UV.y = UV.y;
	}
	else if(face == 4){//+Z
		UV.x = UV.x+SC_1D4;
		UV.y = UV.y+SC_2D6;
	}
	else{//-Z
		UV.x = UV.x+SC_3D4;
		UV.y = UV.y+SC_2D6;
	}

	return UV;
}


vec2 getVCMapping_Cube(int face, vec2 uv, int mode)
{
	vec2 UV = vec2(0.0);
	UV.x = uv.x*SC_2D6;
	UV.y = uv.y*SC_1D4;

	if(face == 0){//+X
		UV.x = UV.x+SC_4D6;
		UV.y = UV.y+SC_3D6;
	}
	else if(face == 1){//-X
		//UV.x = UV.x;
		UV.y = UV.y+SC_3D6;
	}
	else if(face == 2){//+Y
		UV.x = UV.x+SC_2D6;
		UV.y = UV.y+SC_3D4;
	}
	else if(face == 3){//-Y
		UV.x = UV.x+SC_2D6;
		UV.y = UV.y+SC_1D4;
	}
	else if(face == 4){//+Z
		UV.x = UV.x+SC_2D6;
		UV.y = UV.y+SC_3D6;
	}
	else{//-Z
		UV.x = UV.x+SC_2D6;
		//UV.y = UV.y;
	}
	return UV;
}

vec2 getHLMapping_Cube(int face, vec2 uv, int mode)
{
	vec2 UV = vec2(0.0);
	UV.x = uv.x*SC_1D6;
	UV.y = uv.y;

	if(face == 0){//+X
		UV.x = UV.x;
		//UV.y = UV.y+SC_3D6;
	}
	else if(face == 1){//-X
		UV.x = UV.x+SC_1D6;
		//UV.y = UV.y+SC_3D6;
	}
	else if(face == 2){//+Y
		UV.x = UV.x+SC_2D6;
		//UV.y = UV.y+SC_3D4;
	}
	else if(face == 3){//-Y
		UV.x = UV.x+SC_3D6;
		//UV.y = UV.y+SC_1D4;
	}
	else if(face == 4){//+Z
		UV.x = UV.x+SC_4D6;
		//UV.y = UV.y+SC_3D6;
	}
	else{//-Z
		UV.x = UV.x+SC_5D6;
		//UV.y = UV.y;
	}
	return UV;
}

vec2 getVLMapping_Cube(int face, vec2 uv, int mode)
{
	vec2 UV = vec2(0.0);
	UV.x = uv.x;
	UV.y = (1.0-uv.y)*SC_1D6;

	if(face == 0){//+X
		UV.y = UV.y;
	}
	else if(face == 1){//-X
		UV.y = UV.y+SC_1D6;
	}
	else if(face == 2){//+Y
		UV.y = UV.y+SC_2D6;
	}
	else if(face == 3){//-Y
		UV.y = UV.y+SC_3D6;
	}
	else if(face == 4){//+Z
		UV.y = UV.y+SC_4D6;
	}
	else{//-Z
		UV.y = UV.y+SC_5D6;
	}
	return UV;
}

vec2 getLLMapping_VEC2UV(vec3 vec, int mode) //Use for create LP map",
{
	vec2 UV = vec2(0.0);

	UV.y = acos(-vec.y) * SC_1D_PI; // y = 1 to -1, v = 0 to PI,

	float P = abs(vec.x/vec.z);
	//float O = 0.0f;

	if (vec.x >= 0.0) {
		if(vec.z == 0.0) {
			UV.x = 0.5;
		}
		else if(vec.z < 0.0) {
			UV.x = (SC_PI - atan(P)) * SC_1D_PI;
		}
		else {
			UV.x = atan(P) * SC_1D_PI;
		}

	}
	else { // X < 0  //phase
		if(vec.z == 0.0) {
			UV.x = -0.5;
		}
		else if(vec.z < 0.0) {
			UV.x = -(SC_PI - atan(P)) * SC_1D_PI;
		}
		else {
			UV.x = -atan(P) * SC_1D_PI;
		}
	}

	UV.x = (UV.x + 1.0) * 0.5;
	
	if(mode >= 1){ //sky to cube
		UV.x = (1.0 - UV.x);
	}

	return vec2(UV);
}



vec2 getLPMapping_VEC2UV(vec3 vec, int mode) //Use for create LP map
{
	vec2 UV = vec2(0.0);
	float  th, la, lr, L, P;

	//UV = UV * 2 - 1; // Range to -1 to 1

	if(vec.z == 1.0){
		UV.x = UV.y = 0.0;
	}

	else {
		th = sqrt(vec.x * vec.x + vec.y * vec.y);
		if(vec.z < 0.0) {
			la = asin(th);
			lr = (SC_PI - la) * SC_1D_PI;
			UV.y = lr * (vec.y / th);
			UV.x = lr * (vec.x / th);
		}

		else{
			la = asin(th);
			lr = la * SC_1D_PI;
			UV.y = lr * (vec.y / th);
			UV.x = lr* (vec.x / th);
		}
		
		//lr = pow(L * L + P * P, 0.5f); 
	}

	//From -1 to 1 move to 0 to 1 range
	UV = (UV + 1.0) * 0.5;

	if(mode >= 1){ //sky to cube
		UV.x = (1.0 - UV.x);
	}

	return UV;
}


vec2 getSPMapping_VEC2UV(vec3 vec, int mode)
{
	vec2 UV = vec2(0.0);
	float Lr, Lr2, lr, zz;

	if(vec.z == 1.0){
		UV.x = UV.y = 0.0;
	}
	else if(vec.z == -1.0){
		UV.x = 1.0;
		UV.y = 0.0;
	}
	else{
		//Xuv = X/Lr * lr
		//X = Xuv/lr * Lr

		//sin 2th and vec.z == cos 2th
		Lr2 = 1.0-vec.z*vec.z;
		Lr = sqrt(Lr2);

		//sin th
		lr = sqrt((1.0-vec.z)/2.0);
		//cos th
		//zz = Lr/(2.0*lr);
		float A = lr/Lr;
		UV.x = vec.x*A;
		UV.y = vec.y*A;

		
		
	}

	//From -1 to 1 move to 0 to 1 range
	UV = (UV + 1.0) * 0.5;

	if(mode >= 1){ //sky to cube
		UV.x = (1.0 - UV.x);
	}

	return UV;
}



vec2 getDPMapping_VEC2UV(vec3 vec, int mode)
{
	vec2 uv = vec2(0.0);
	if(vec.z < 0.0){ // Front
		uv = vec.xy/(1.0 - vec.z);
		uv = (uv + 1.0) * 0.5; // Range from -1 to 1 to 0 to 1
		if(mode >= 1){ //sky to cube
			uv.x = (1.0 - uv.x);
		}
		uv.x *= 0.5; // Move to left in texture
	}
	else{ // Back
		vec.y = -vec.y;
		uv = - vec.xy/(1.0 + vec.z);
		uv = (uv + 1.0) * 0.5; // Range from -1 to 1 to 0 to 1
		if(mode >= 1){ //sky to cube
			uv.x = (1.0 - uv.x);
		}
		//uv.y = -uv.y;
		uv.x = (uv.x * 0.5) + 0.5; // Move to right in texture
	}

	return uv;
}



/////////////////////////////////////////////////////////


vec3 DecodeRGBM(vec4 rgbm, float maxRange, float lum)
{
	return rgbm.rgb * (rgbm.a * maxRange) * lum;
}



vec4 EncodeRGBM(vec3 rgb, float maxRange)
{
    float maxRGB = max(rgb.x,max(rgb.g,rgb.b));
    float M = maxRGB / maxRange;
    M = ceil(M * 255.0) / 255.0;
    return vec4(rgb / (M * maxRange), M);
}




/////////////////////////////////////////////////////////


