import{S as D,af as G,j as L,ay as M,g as x}from"./three.module-67558082.js";import{G as y}from"./GLTFLoader-05c08bfa.js";import{D as v,R as I}from"./RoomEnvironment-3dce7885.js";import{Size as O}from"./model-76944e9e.js";import{U as f}from"./utils-612895f9.js";import{C as A,a as $}from"./CSS2DRenderer-d82d42d3.js";import{G as j}from"./lil-gui.esm-1e0f7d72.js";import"./OrbitControls-3d27026f.js";const t=O.getInstance(),c=new D,m=f.initCamera(t),h=f.initRenderer(t),H=f.initControl(m,h),R=new y,r=new A,l=8,p=16,s=new G;let g;const P=new j,w={size:5};T();z();function T(){const i=new v;i.setDecoderPath("/gltf/"),R.setDRACOLoader(i),r.setSize(t.width,t.height),r.domElement.style.position="absolute",r.domElement.style.top="0px",r.domElement.style.pointerEvents="none",document.body.appendChild(r.domElement),m.position.set(0,12,20),t.onResize(function(){f.onResize(t,m,h),r.setSize(t.width,t.height)}),c.background=new L(3092271);const e=new M(h);c.environment=e.fromScene(new I,.04).texture;const o=new x(16777215,.2);c.add(o),R.load("/models/cabin_001.glb",function(d){console.log(d.scene),g=d.scene,g.rotation.y=-Math.PI/2,S(w.size),P.add(w,"size",1,300,1).onChange(function(){S(w.size)})}),c.add(s)}function S(i){for(;s.children.length>0;){const n=s.children[0];n.parent?.remove(n)}const e=Math.ceil(Math.sqrt(i)),o=e*(e-1)>=i?e-1:e,d=o*e;console.log(`${o},${e}`);let C=1;for(let n=0;n<o;n++)for(let a=0;a<e;a++){if(i>d-C){const b=g.clone();b.position.set(n*p,0,a*l),s.add(b);const u=document.createElement("div");u.className="label",u.textContent=`sn:${n}-${a}`;const E=new $(u);E.position.set(n*p+3,3,a*l+1),s.add(E)}C+=1}s.position.x=-o*p/2+p/2,s.position.z=-e*l/2+l/2,m.position.set(0,o*5,e*8)}function z(){h.render(c,m),H.update(),requestAnimationFrame(z)}
