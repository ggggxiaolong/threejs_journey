import{U as y,p as _,aT as F,ag as t,aU as D,aV as w,aW as M,S as b,g as S,D as P,_ as U,n as C,f as R,j as T,k as I,l as L}from"./three.module-67558082.js";import{P as A,F as G,E as Q,R as W}from"./RenderPass-c121d6a5.js";import{Size as X}from"./model-76944e9e.js";import{U as c}from"./utils-612895f9.js";import"./OrbitControls-3d27026f.js";const j={uniforms:{tDiffuse:{value:null},tDisp:{value:null},byp:{value:0},amount:{value:.08},angle:{value:.02},seed:{value:.02},seed_x:{value:.02},seed_y:{value:.02},distortion_x:{value:.5},distortion_y:{value:.6},col_s:{value:.05}},vertexShader:`

		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		uniform int byp; //should we apply the glitch ?

		uniform sampler2D tDiffuse;
		uniform sampler2D tDisp;

		uniform float amount;
		uniform float angle;
		uniform float seed;
		uniform float seed_x;
		uniform float seed_y;
		uniform float distortion_x;
		uniform float distortion_y;
		uniform float col_s;

		varying vec2 vUv;


		float rand(vec2 co){
			return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
		}

		void main() {
			if(byp<1) {
				vec2 p = vUv;
				float xs = floor(gl_FragCoord.x / 0.5);
				float ys = floor(gl_FragCoord.y / 0.5);
				//based on staffantans glitch shader for unity https://github.com/staffantan/unityglitch
				float disp = texture2D(tDisp, p*seed*seed).r;
				if(p.y<distortion_x+col_s && p.y>distortion_x-col_s*seed) {
					if(seed_x>0.){
						p.y = 1. - (p.y + distortion_y);
					}
					else {
						p.y = distortion_y;
					}
				}
				if(p.x<distortion_y+col_s && p.x>distortion_y-col_s*seed) {
					if(seed_y>0.){
						p.x=distortion_x;
					}
					else {
						p.x = 1. - (p.x + distortion_x);
					}
				}
				p.x+=disp*seed_x*(seed/5.);
				p.y+=disp*seed_y*(seed/5.);
				//base from RGB shift shader
				vec2 offset = amount * vec2( cos(angle), sin(angle));
				vec4 cr = texture2D(tDiffuse, p + offset);
				vec4 cga = texture2D(tDiffuse, p);
				vec4 cb = texture2D(tDiffuse, p - offset);
				gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);
				//add noise
				vec4 snow = 200.*amount*vec4(rand(vec2(xs * seed,ys * seed*50.))*0.2);
				gl_FragColor = gl_FragColor+ snow;
			}
			else {
				gl_FragColor=texture2D (tDiffuse, vUv);
			}
		}`};class k extends A{constructor(e=64){super();const s=j;this.uniforms=y.clone(s.uniforms),this.heightMap=this.generateHeightmap(e),this.uniforms.tDisp.value=this.heightMap,this.material=new _({uniforms:this.uniforms,vertexShader:s.vertexShader,fragmentShader:s.fragmentShader}),this.fsQuad=new G(this.material),this.goWild=!1,this.curF=0,this.generateTrigger()}render(e,s,o){e.capabilities.isWebGL2===!1&&(this.uniforms.tDisp.value.format=F),this.uniforms.tDiffuse.value=o.texture,this.uniforms.seed.value=Math.random(),this.uniforms.byp.value=0,this.curF%this.randX==0||this.goWild==!0?(this.uniforms.amount.value=Math.random()/30,this.uniforms.angle.value=t.randFloat(-Math.PI,Math.PI),this.uniforms.seed_x.value=t.randFloat(-1,1),this.uniforms.seed_y.value=t.randFloat(-1,1),this.uniforms.distortion_x.value=t.randFloat(0,1),this.uniforms.distortion_y.value=t.randFloat(0,1),this.curF=0,this.generateTrigger()):this.curF%this.randX<this.randX/5?(this.uniforms.amount.value=Math.random()/90,this.uniforms.angle.value=t.randFloat(-Math.PI,Math.PI),this.uniforms.distortion_x.value=t.randFloat(0,1),this.uniforms.distortion_y.value=t.randFloat(0,1),this.uniforms.seed_x.value=t.randFloat(-.3,.3),this.uniforms.seed_y.value=t.randFloat(-.3,.3)):this.goWild==!1&&(this.uniforms.byp.value=1),this.curF++,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(s),this.clear&&e.clear(),this.fsQuad.render(e))}generateTrigger(){this.randX=t.randInt(120,240)}generateHeightmap(e){const s=new Float32Array(e*e),o=e*e;for(let a=0;a<o;a++){const l=t.randFloat(0,1);s[a]=l}const r=new D(s,e,e,w,M);return r.needsUpdate=!0,r}dispose(){this.material.dispose(),this.heightMap.dispose(),this.fsQuad.dispose()}}const h=X.getInstance(),n=new b,f=c.initCamera(h),p=c.initRenderer(h),E=c.initControl(f,p),g=new Q(p);let i;H();x();function H(){f.position.set(0,0,250),h.onResize(function(){c.onResize(h,f,p)});const v=new S(16777215,.4);n.add(v);const e=new P(16777215,.8);e.position.set(1,1,1),n.add(e);const s=new U;n.add(s);const o=new C(1,5,4),r=new R,a=100,l=new T(16777215);i=new I(o,r,a);const d=new L;for(let u=0;u<a;u++){d.identity();const m=t.randFloat(1,10);d.makeScale(m,m,m),d.setPosition(t.randFloat(-80,80),t.randFloat(-80,80),t.randFloat(-80,80)),i.setMatrixAt(u,d),l.set(16777215*Math.random()),i.setColorAt(u,l)}n.add(i),g.addPass(new W(n,f)),g.addPass(new k(62))}function x(){i.rotation.x+=.005,i.rotation.y+=.01,g.render(),E.update(),requestAnimationFrame(x)}
