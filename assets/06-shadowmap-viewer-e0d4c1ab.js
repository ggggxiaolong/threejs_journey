import{G as E}from"./lil-gui.esm-1e0f7d72.js";import{O as q,S as A,U as K,p as V,e as D,a as x,q as _,L as H,M as J,r as N,j as Q,P as X,W as Y,f as Z,t as $,B as ee,u as te,g as ie,D as ae,h as oe,v as F,w as ne}from"./three.module-67558082.js";import{O as se}from"./OrbitControls-3d27026f.js";import{Size as re}from"./model-76944e9e.js";const he={uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		#include <packing>

		void main() {

			float depth = 1.0 - unpackRGBAToDepth( texture2D( tDiffuse, vUv ) );
			gl_FragColor = vec4( vec3( depth ), opacity );

		}`};class G{constructor(o){const u=this,W=o.name!==void 0&&o.name!=="";let R;const d={x:10,y:10,width:256,height:256},l=new q(window.innerWidth/-2,window.innerWidth/2,window.innerHeight/2,window.innerHeight/-2,1,10);l.position.set(0,0,2);const M=new A,L=he,U=K.clone(L.uniforms),T=new V({uniforms:U,vertexShader:L.vertexShader,fragmentShader:L.fragmentShader}),j=new D(d.width,d.height),g=new x(j,T);M.add(g);let c,C;if(W){c=document.createElement("canvas");const t=c.getContext("2d");t.font="Bold 20px Arial";const f=t.measureText(o.name).width;c.width=f,c.height=25,t.font="Bold 20px Arial",t.fillStyle="rgba( 255, 0, 0, 1 )",t.fillText(o.name,0,20);const m=new _(c);m.magFilter=H,m.minFilter=H,m.needsUpdate=!0;const b=new J({map:m,side:N});b.transparent=!0;const O=new D(c.width,c.height);C=new x(O,b),M.add(C)}function I(){u.position.set(u.position.x,u.position.y)}this.enabled=!0,this.size={width:d.width,height:d.height,set:function(t,f){this.width=t,this.height=f,g.scale.set(this.width/d.width,this.height/d.height,1),I()}},this.position={x:d.x,y:d.y,set:function(t,f){this.x=t,this.y=f;const m=u.size.width,b=u.size.height;g.position.set(-window.innerWidth/2+m/2+this.x,window.innerHeight/2-b/2-this.y,0),W&&C.position.set(g.position.x,g.position.y-u.size.height/2+c.height/2,0)}},this.render=function(t){this.enabled&&(U.tDiffuse.value=o.shadow.map.texture,R=t.autoClear,t.autoClear=!1,t.clearDepth(),t.render(M,l),t.autoClear=R)},this.updateForWindowResize=function(){this.enabled&&(l.left=window.innerWidth/-2,l.right=window.innerWidth/2,l.top=window.innerHeight/2,l.bottom=window.innerHeight/-2,l.updateProjectionMatrix(),this.update())},this.update=function(){this.position.set(this.position.x,this.position.y),this.size.set(this.size.width,this.size.height)},this.update()}}let r,w,n;const s=re.getInstance();let P,a,i,h,p,y,z;const de=new ne;let S,v;ce();le();we();pe();k();function ce(){z=new E,r=new A,r.background=new Q(3355443),w=new X(60,s.aspect,.1,100),w.position.set(10,40,50),r.add(w),n=new Y,n.setSize(s.width,s.height),n.setPixelRatio(s.pixelRatio),document.body.appendChild(n.domElement),P=new se(w,n.domElement),P.target.set(0,1,0)}function le(){let e=new Z({color:16711680,shininess:150,specular:13421772});h=new x(new $(20,5,75,10),e),h.scale.multiplyScalar(1/7),h.position.set(5,7,-10),p=new x(new ee(5,5,5),e),p.position.set(5,7,20),y=new x(new D(70,70),new te({color:13421772})),y.rotation.x=-Math.PI/2,r.add(y,h,p)}function we(){const e=new ie(16777215,.2);r.add(e),a=new ae(16777215,.8),a.position.set(0,20,0),a.name="Dir Light",r.add(a),i=new oe(16777215,.7,500,Math.PI/9,.1),i.position.set(51,27,-10),i.target=h,i.name="Spot Light",r.add(i),z.add(i.position,"x",-10,100),z.add(i.position,"y",-10,100),z.add(i.position,"z",-10,100),S=new G(a),v=new G(i),B()}function B(){const e=s.width*.17,o=s.height*.17;S.position.set(10,10),S.size.set(e,o),v.position.set(e+20,10),v.size.set(e,o)}function pe(){n.shadowMap.enabled=!0,i.castShadow=!0,a.castShadow=!0,y.receiveShadow=!0,h.castShadow=!0,p.castShadow=!0,a.shadow.camera.far=21,a.shadow.camera.left=16,a.shadow.camera.right=-16,a.shadow.camera.top=28,a.shadow.camera.bottom=-28;const e=new F(a.shadow.camera);r.add(e),i.shadow.camera.near=40,i.shadow.camera.far=94;const o=new F(i.shadow.camera);r.add(o)}function k(){P.update(),n.render(r,w);const e=de.getDelta();h.rotation.x+=e*.5,h.rotation.y+=e*2,h.rotation.z+=e*.5,p.rotation.x+=e*.5,p.rotation.y+=e*2,p.rotation.z+=e*.5,S.render(n),v.render(n),requestAnimationFrame(k)}s.onResize(function(){w.aspect=s.aspect,w.updateProjectionMatrix(),n.setSize(s.width,s.height),B(),S.updateForWindowResize(),v.updateForWindowResize()});
