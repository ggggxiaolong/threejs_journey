import{U as x,p as v,d as g,aN as U,aR as R,S as E,$ as F,a4 as m,V as _,aS as K,a as M,w as L}from"./three.module-67558082.js";import{P as I,F as b,E as z,R as P}from"./RenderPass-c121d6a5.js";import{Size as N}from"./model-76944e9e.js";import{U as h}from"./utils-612895f9.js";import"./OrbitControls-3d27026f.js";const Q={uniforms:{tDiffuse:{value:null},time:{value:0},nIntensity:{value:.5},sIntensity:{value:.05},sCount:{value:4096},grayscale:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		// control parameter
		uniform float time;

		uniform bool grayscale;

		// noise effect intensity value (0 = no effect, 1 = full effect)
		uniform float nIntensity;

		// scanlines effect intensity value (0 = no effect, 1 = full effect)
		uniform float sIntensity;

		// scanlines effect count value (0 = no effect, 4096 = full effect)
		uniform float sCount;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

		// sample the source
			vec4 cTextureScreen = texture2D( tDiffuse, vUv );

		// make some noise
			float dx = rand( vUv + time );

		// add noise
			vec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx, 0.0, 1.0 );

		// get us a sine and cosine
			vec2 sc = vec2( sin( vUv.y * sCount ), cos( vUv.y * sCount ) );

		// add scanlines
			cResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * sIntensity;

		// interpolate between source and result by intensity
			cResult = cTextureScreen.rgb + clamp( nIntensity, 0.0,1.0 ) * ( cResult - cTextureScreen.rgb );

		// convert to grayscale if desired
			if( grayscale ) {

				cResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );

			}

			gl_FragColor =  vec4( cResult, cTextureScreen.a );

		}`};class X extends I{constructor(e,t,n,r){super();const o=Q;this.uniforms=x.clone(o.uniforms),this.material=new v({uniforms:this.uniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),r!==void 0&&(this.uniforms.grayscale.value=r),e!==void 0&&(this.uniforms.nIntensity.value=e),t!==void 0&&(this.uniforms.sIntensity.value=t),n!==void 0&&(this.uniforms.sCount.value=n),this.fsQuad=new b(this.material)}render(e,t,n,r){this.uniforms.tDiffuse.value=n.texture,this.uniforms.time.value+=r,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const y={defines:{KERNEL_SIZE_FLOAT:"25.0",KERNEL_SIZE_INT:"25"},uniforms:{tDiffuse:{value:null},uImageIncrement:{value:new g(.001953125,0)},cKernel:{value:[]}},vertexShader:`

		uniform vec2 uImageIncrement;

		varying vec2 vUv;

		void main() {

			vUv = uv - ( ( KERNEL_SIZE_FLOAT - 1.0 ) / 2.0 ) * uImageIncrement;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float cKernel[ KERNEL_SIZE_INT ];

		uniform sampler2D tDiffuse;
		uniform vec2 uImageIncrement;

		varying vec2 vUv;

		void main() {

			vec2 imageCoord = vUv;
			vec4 sum = vec4( 0.0, 0.0, 0.0, 0.0 );

			for( int i = 0; i < KERNEL_SIZE_INT; i ++ ) {

				sum += texture2D( tDiffuse, imageCoord ) * cKernel[ i ];
				imageCoord += uImageIncrement;

			}

			gl_FragColor = sum;

		}`,buildKernel:function(i){let t=2*Math.ceil(i*3)+1;t>25&&(t=25);const n=(t-1)*.5,r=new Array(t);let o=0;for(let s=0;s<t;++s)r[s]=Y(s-n,i),o+=r[s];for(let s=0;s<t;++s)r[s]/=o;return r}};function Y(i,e){return Math.exp(-(i*i)/(2*e*e))}class a extends I{constructor(e=1,t=25,n=4){super(),this.renderTargetX=new U,this.renderTargetX.texture.name="BloomPass.x",this.renderTargetY=new U,this.renderTargetY.texture.name="BloomPass.y",this.combineUniforms=x.clone(p.uniforms),this.combineUniforms.strength.value=e,this.materialCombine=new v({uniforms:this.combineUniforms,vertexShader:p.vertexShader,fragmentShader:p.fragmentShader,blending:R,transparent:!0});const r=y;this.convolutionUniforms=x.clone(r.uniforms),this.convolutionUniforms.uImageIncrement.value=a.blurX,this.convolutionUniforms.cKernel.value=y.buildKernel(n),this.materialConvolution=new v({uniforms:this.convolutionUniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,defines:{KERNEL_SIZE_FLOAT:t.toFixed(1),KERNEL_SIZE_INT:t.toFixed(0)}}),this.needsSwap=!1,this.fsQuad=new b(null)}render(e,t,n,r,o){o&&e.state.buffers.stencil.setTest(!1),this.fsQuad.material=this.materialConvolution,this.convolutionUniforms.tDiffuse.value=n.texture,this.convolutionUniforms.uImageIncrement.value=a.blurX,e.setRenderTarget(this.renderTargetX),e.clear(),this.fsQuad.render(e),this.convolutionUniforms.tDiffuse.value=this.renderTargetX.texture,this.convolutionUniforms.uImageIncrement.value=a.blurY,e.setRenderTarget(this.renderTargetY),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.materialCombine,this.combineUniforms.tDiffuse.value=this.renderTargetY.texture,o&&e.state.buffers.stencil.setTest(!0),e.setRenderTarget(n),this.clear&&e.clear(),this.fsQuad.render(e)}setSize(e,t){this.renderTargetX.setSize(e,t),this.renderTargetY.setSize(e,t)}dispose(){this.renderTargetX.dispose(),this.renderTargetY.dispose(),this.materialCombine.dispose(),this.materialConvolution.dispose(),this.fsQuad.dispose()}}const p={uniforms:{tDiffuse:{value:null},strength:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float strength;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = strength * texel;

		}`};a.blurX=new g(.001953125,0);a.blurY=new g(0,.001953125);const l=N.getInstance(),S=new E,f=h.initCamera(l),u=h.initRenderer(l),V=h.initControl(f,u);let T;const w=new L;let d;const c=new z(u);Z();C();function Z(){f.position.set(0,0,3),l.onResize(function(){h.onResize(l,f,u),c.setSize(l.width,l.height)});const i=new F,e=i.load("textures/lava/cloud.png"),t=i.load("textures/lava/lavatile.jpg");e.wrapS=m,e.wrapT=m,t.wrapS=m,t.wrapT=m,T={fogDensity:{value:.45},fogColor:{value:new _(0,0,0)},time:{value:1},uvScale:{value:new g(3,1)},texture1:{value:e},texture2:{value:t}};const n=new K(.65,.3,30,30),r=new v({uniforms:T,vertexShader:`
        varying vec2 vUv;
        uniform vec2 uvScale;
        void main(){
            vUv = uvScale * uv;
            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
			gl_Position = projectionMatrix * mvPosition;
        }
    `,fragmentShader:`
        uniform float time;
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        uniform float fogDensity;
		uniform vec3 fogColor;
        varying vec2 vUv;
        void main(){
            vec2 position = - 1.0 + 2.0 * vUv;

            vec4 noise = texture2D( texture1, vUv );
            vec2 T1 = vUv + vec2( 1.5, - 1.5 ) * time * 0.02;
            vec2 T2 = vUv + vec2( - 0.5, 2.0 ) * time * 0.01;

            T1.x += noise.x * 2.0;
            T1.y += noise.y * 2.0;
            T2.x -= noise.y * 0.2;
            T2.y += noise.z * 0.2;

            float p = texture2D( texture1, T1 * 2.0 ).a;

            vec4 color = texture2D( texture2, T2 * 2.0 );
            vec4 temp = color * ( vec4( p, p, p, p ) * 2.0 ) + ( color * color - 0.1 );

            if( temp.r > 1.0 ) { temp.bg += clamp( temp.r - 2.0, 0.0, 100.0 ); }
            if( temp.g > 1.0 ) { temp.rb += temp.g - 1.0; }
            if( temp.b > 1.0 ) { temp.rg += temp.b - 1.0; }

            gl_FragColor = temp;

            float depth = gl_FragCoord.z / gl_FragCoord.w;
            const float LOG2 = 1.442695;
            float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );
            fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );

            gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );
        }
    `});d=new M(n,r),S.add(d),u.autoClear=!1;const o=new P(S,f),s=new a(1.25),D=new X(.35,.95,2048,0);c.addPass(o),c.addPass(s),c.addPass(D)}function C(){const i=w.getElapsedTime();T.time.value=i,d.rotation.y=.125*i,d.rotation.x=.05*i,u.render(S,f),u.clear(),c.render(w.getDelta()),V.update(),requestAnimationFrame(C)}
