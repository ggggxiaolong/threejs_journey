import{a as G,V as i,j as _,as as pe,aA as ge,l as B,P as Q,aN as he,U as k,aO as K,p as $,aP as Z,az as xe,B as J,S as we,$ as ye,aQ as Se,e as Ce,a4 as X,ay as Me,u as Pe,ag as q,w as Ee}from"./three.module-67558082.js";import{Size as be}from"./model-76944e9e.js";import{U as V}from"./utils-612895f9.js";import{G as ze}from"./lil-gui.esm-1e0f7d72.js";import"./OrbitControls-3d27026f.js";class De extends G{constructor(r,e={}){super(r),this.isWater=!0;const l=this,E=e.textureWidth!==void 0?e.textureWidth:512,ee=e.textureHeight!==void 0?e.textureHeight:512,te=e.clipBias!==void 0?e.clipBias:0,oe=e.alpha!==void 0?e.alpha:1,ae=e.time!==void 0?e.time:0,ie=e.waterNormals!==void 0?e.waterNormals:null,ne=e.sunDirection!==void 0?e.sunDirection:new i(.70707,.70707,0),re=new _(e.sunColor!==void 0?e.sunColor:16777215),se=new _(e.waterColor!==void 0?e.waterColor:8355711),j=e.eye!==void 0?e.eye:new i(0,0,0),le=e.distortionScale!==void 0?e.distortionScale:20,ce=e.side!==void 0?e.side:pe,ue=e.fog!==void 0?e.fog:!1,d=new ge,m=new i,f=new i,A=new i,w=new B,b=new i(0,0,-1),c=new Z,y=new i,z=new i,S=new Z,D=new B,a=new Q,O=new he(E,ee),L={uniforms:k.merge([K.fog,K.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new B},sunColor:{value:new _(8355711)},sunDirection:{value:new i(.70707,.70707,0)},eye:{value:new i},waterColor:{value:new _(5592405)}}]),vertexShader:`
				uniform mat4 textureMatrix;
				uniform float time;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				#include <common>
				#include <fog_pars_vertex>
				#include <shadowmap_pars_vertex>
				#include <logdepthbuf_pars_vertex>

				void main() {
					mirrorCoord = modelMatrix * vec4( position, 1.0 );
					worldPosition = mirrorCoord.xyzw;
					mirrorCoord = textureMatrix * mirrorCoord;
					vec4 mvPosition =  modelViewMatrix * vec4( position, 1.0 );
					gl_Position = projectionMatrix * mvPosition;

				#include <beginnormal_vertex>
				#include <defaultnormal_vertex>
				#include <logdepthbuf_vertex>
				#include <fog_vertex>
				#include <shadowmap_vertex>
			}`,fragmentShader:`
				uniform sampler2D mirrorSampler;
				uniform float alpha;
				uniform float time;
				uniform float size;
				uniform float distortionScale;
				uniform sampler2D normalSampler;
				uniform vec3 sunColor;
				uniform vec3 sunDirection;
				uniform vec3 eye;
				uniform vec3 waterColor;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				vec4 getNoise( vec2 uv ) {
					vec2 uv0 = ( uv / 103.0 ) + vec2(time / 17.0, time / 29.0);
					vec2 uv1 = uv / 107.0-vec2( time / -19.0, time / 31.0 );
					vec2 uv2 = uv / vec2( 8907.0, 9803.0 ) + vec2( time / 101.0, time / 97.0 );
					vec2 uv3 = uv / vec2( 1091.0, 1027.0 ) - vec2( time / 109.0, time / -113.0 );
					vec4 noise = texture2D( normalSampler, uv0 ) +
						texture2D( normalSampler, uv1 ) +
						texture2D( normalSampler, uv2 ) +
						texture2D( normalSampler, uv3 );
					return noise * 0.5 - 1.0;
				}

				void sunLight( const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse, inout vec3 diffuseColor, inout vec3 specularColor ) {
					vec3 reflection = normalize( reflect( -sunDirection, surfaceNormal ) );
					float direction = max( 0.0, dot( eyeDirection, reflection ) );
					specularColor += pow( direction, shiny ) * sunColor * spec;
					diffuseColor += max( dot( sunDirection, surfaceNormal ), 0.0 ) * sunColor * diffuse;
				}

				#include <common>
				#include <packing>
				#include <bsdfs>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <lights_pars_begin>
				#include <shadowmap_pars_fragment>
				#include <shadowmask_pars_fragment>

				void main() {

					#include <logdepthbuf_fragment>
					vec4 noise = getNoise( worldPosition.xz * size );
					vec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );

					vec3 diffuseLight = vec3(0.0);
					vec3 specularLight = vec3(0.0);

					vec3 worldToEye = eye-worldPosition.xyz;
					vec3 eyeDirection = normalize( worldToEye );
					sunLight( surfaceNormal, eyeDirection, 100.0, 2.0, 0.5, diffuseLight, specularLight );

					float distance = length(worldToEye);

					vec2 distortion = surfaceNormal.xz * ( 0.001 + 1.0 / distance ) * distortionScale;
					vec3 reflectionSample = vec3( texture2D( mirrorSampler, mirrorCoord.xy / mirrorCoord.w + distortion ) );

					float theta = max( dot( eyeDirection, surfaceNormal ), 0.0 );
					float rf0 = 0.3;
					float reflectance = rf0 + ( 1.0 - rf0 ) * pow( ( 1.0 - theta ), 5.0 );
					vec3 scatter = max( 0.0, dot( surfaceNormal, eyeDirection ) ) * waterColor;
					vec3 albedo = mix( ( sunColor * diffuseLight * 0.3 + scatter ) * getShadowMask(), ( vec3( 0.1 ) + reflectionSample * 0.9 + reflectionSample * specularLight ), reflectance);
					vec3 outgoingLight = albedo;
					gl_FragColor = vec4( outgoingLight, alpha );

					#include <tonemapping_fragment>
					#include <fog_fragment>
				}`},n=new $({fragmentShader:L.fragmentShader,vertexShader:L.vertexShader,uniforms:k.clone(L.uniforms),lights:!0,side:ce,fog:ue});n.uniforms.mirrorSampler.value=O.texture,n.uniforms.textureMatrix.value=D,n.uniforms.alpha.value=oe,n.uniforms.time.value=ae,n.uniforms.normalSampler.value=ie,n.uniforms.sunColor.value=re,n.uniforms.waterColor.value=se,n.uniforms.sunDirection.value=ne,n.uniforms.distortionScale.value=le,n.uniforms.eye.value=j,l.material=n,l.onBeforeRender=function(o,me,v){if(f.setFromMatrixPosition(l.matrixWorld),A.setFromMatrixPosition(v.matrixWorld),w.extractRotation(l.matrixWorld),m.set(0,0,1),m.applyMatrix4(w),y.subVectors(f,A),y.dot(m)>0)return;y.reflect(m).negate(),y.add(f),w.extractRotation(v.matrixWorld),b.set(0,0,-1),b.applyMatrix4(w),b.add(A),z.subVectors(f,b),z.reflect(m).negate(),z.add(f),a.position.copy(y),a.up.set(0,1,0),a.up.applyMatrix4(w),a.up.reflect(m),a.lookAt(z),a.far=v.far,a.updateMatrixWorld(),a.projectionMatrix.copy(v.projectionMatrix),D.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),D.multiply(a.projectionMatrix),D.multiply(a.matrixWorldInverse),d.setFromNormalAndCoplanarPoint(m,f),d.applyMatrix4(a.matrixWorldInverse),c.set(d.normal.x,d.normal.y,d.normal.z,d.constant);const s=a.projectionMatrix;S.x=(Math.sign(c.x)+s.elements[8])/s.elements[0],S.y=(Math.sign(c.y)+s.elements[9])/s.elements[5],S.z=-1,S.w=(1+s.elements[10])/s.elements[14],c.multiplyScalar(2/c.dot(S)),s.elements[2]=c.x,s.elements[6]=c.y,s.elements[10]=c.z+1-te,s.elements[14]=c.w,j.setFromMatrixPosition(v.matrixWorld);const de=o.getRenderTarget(),fe=o.xr.enabled,ve=o.shadowMap.autoUpdate;l.visible=!1,o.xr.enabled=!1,o.shadowMap.autoUpdate=!1,o.setRenderTarget(O),o.state.buffers.depth.setMask(!0),o.autoClear===!1&&o.clear(),o.render(me,a),l.visible=!0,o.xr.enabled=fe,o.shadowMap.autoUpdate=ve,o.setRenderTarget(de);const H=v.viewport;H!==void 0&&o.state.viewport(H)}}}class W extends G{constructor(){const r=W.SkyShader,e=new $({name:"SkyShader",fragmentShader:r.fragmentShader,vertexShader:r.vertexShader,uniforms:k.clone(r.uniforms),side:xe,depthWrite:!1});super(new J(1,1,1),e),this.isSky=!0}}W.SkyShader={uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new i},up:{value:new i(0,1,0)}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;
		uniform vec3 up;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( dot( vSunDirection, up ) );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorbtion + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform vec3 up;

		const vec3 cameraPos = vec3( 0.0, 0.0, 0.0 );

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPos );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
			L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

			vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

			vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

			gl_FragColor = vec4( retColor, 1.0 );

			#include <tonemapping_fragment>
			#include <encodings_fragment>

		}`};const R=be.getInstance(),u=new we,T=new Q(50,R.aspect,1,2e4),C=V.initRenderer(R),_e=new ye,U=V.initControl(T,C),Re=new Ee;let h,g,M,P;const F={sunElevation:10,sunAzimuth:20},p=new ze;let I,x;Te();Y();function Te(){T.position.set(30,30,100),C.toneMapping=Se,R.onResize(function(){V.onResize(R,T,C)}),U.minDistance=40,U.maxDistance=200,x=new i(30,1,0),h=new De(new Ce(1e4,1e4),{textureHeight:512,textureWidth:512,waterNormals:_e.load("/textures/waternormals.jpg",function(E){E.wrapS=X,E.wrapT=X}),sunDirection:x,distortionScale:3.7,sunColor:16777215,waterColor:7695}),h.rotation.x=-Math.PI/2,u.add(h),g=new W,g.scale.setScalar(1e4),u.add(g),g.material.uniforms.sunPosition.value.copy(x);const t=g.material.uniforms;t.turbidity.value=10,t.rayleigh.value=2,t.mieCoefficient.value=.005,t.mieDirectionalG.value=.8,p.add(t.turbidity,"value",0,100,.1).name("turbidity"),p.add(t.rayleigh,"value",0,100,.1).name("rayleigh"),p.add(t.mieCoefficient,"value",0,1,.001).name("mieCoefficient"),p.add(t.mieDirectionalG,"value",0,1,.1).name("mieDirectionalG"),I=new Me(C),P=I.fromScene(u),u.environment=P.texture,N(),M=new G(new J(20,20,20),new Pe({roughness:0})),u.add(M);const r=p.addFolder("Sun");r.add(F,"sunElevation",0,90,.1).onChange(N),r.add(F,"sunAzimuth",-180,180,.1).onChange(N);const e=p.addFolder("Water"),l=h.material.uniforms;e.add(l.distortionScale,"value",0,80,.1).name("distortionScale"),e.add(l.size,"value",0,10,.1).name("size")}function N(){const t=q.degToRad(90-F.sunElevation),r=q.degToRad(F.sunAzimuth);x.setFromSphericalCoords(1,t,r),g.material.uniforms.sunPosition.value.copy(x),h.material.uniforms.sunDirection.value.copy(x).normalize(),P.dispose(),P=I.fromScene(u),u.environment=P.texture}function Y(){C.render(u,T),U.update();const t=Re.getElapsedTime();h.material.uniforms.time.value=t,M.position.y=Math.sin(t)*20+5,M.rotation.x=t,M.rotation.z=t,requestAnimationFrame(Y)}
