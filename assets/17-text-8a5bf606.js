import{G as k,J as L,a2 as F,a0 as P,S as B,d as C,D as E,a as m,b as q,M as G,a3 as R,c as M}from"./three.module-2fef69e5.js";import{Size as H}from"./model-76944e9e.js";import{U as y}from"./utils-315ca8db.js";import"./OrbitControls-916b91d8.js";class _ extends k{constructor(n){super(n)}load(n,e,o,c){const t=this,i=new L(this.manager);i.setPath(this.path),i.setRequestHeader(this.requestHeader),i.setWithCredentials(this.withCredentials),i.load(n,function(a){const h=t.parse(JSON.parse(a));e&&e(h)},o,c)}parse(n){return new A(n)}}class A{constructor(n){this.isFont=!0,this.type="Font",this.data=n}generateShapes(n,e=100){const o=[],c=I(n,e,this.data);for(let t=0,i=c.length;t<i;t++)o.push(...c[t].toShapes());return o}}function I(l,n,e){const o=Array.from(l),c=n/e.resolution,t=(e.boundingBox.yMax-e.boundingBox.yMin+e.underlineThickness)*c,i=[];let a=0,h=0;for(let d=0;d<o.length;d++){const u=o[d];if(u===`
`)a=0,h-=t;else{const p=O(u,c,a,h,e);a+=p.offsetX,i.push(p.path)}}return i}function O(l,n,e,o,c){const t=c.glyphs[l]||c.glyphs["?"];if(!t){console.error('THREE.Font: character "'+l+'" does not exists in font family '+c.familyName+".");return}const i=new F;let a,h,d,u,p,f,v,S;if(t.o){const s=t._cachedOutline||(t._cachedOutline=t.o.split(" "));for(let r=0,z=s.length;r<z;)switch(s[r++]){case"m":a=s[r++]*n+e,h=s[r++]*n+o,i.moveTo(a,h);break;case"l":a=s[r++]*n+e,h=s[r++]*n+o,i.lineTo(a,h);break;case"q":d=s[r++]*n+e,u=s[r++]*n+o,p=s[r++]*n+e,f=s[r++]*n+o,i.quadraticCurveTo(p,f,d,u);break;case"b":d=s[r++]*n+e,u=s[r++]*n+o,p=s[r++]*n+e,f=s[r++]*n+o,v=s[r++]*n+e,S=s[r++]*n+o,i.bezierCurveTo(p,f,v,S,d,u);break}}return{offsetX:t.ha*n,path:i}}class j extends P{constructor(n,e={}){const o=e.font;if(o===void 0)super();else{const c=o.generateShapes(n,e.size);e.depth=e.height!==void 0?e.height:50,e.bevelThickness===void 0&&(e.bevelThickness=10),e.bevelSize===void 0&&(e.bevelSize=8),e.bevelEnabled===void 0&&(e.bevelEnabled=!1),super(c,e)}this.type="TextGeometry"}}const b=H.getInstance(),g=new B,x=y.initCamera(b),w=y.initRenderer(b),D=y.initControl(x,w);J();T();function J(){x.position.set(0,250,500),b.onResize(function(){y.onResize(b,x,w)});const l=new C(16777215,.3);g.add(l);const n=new E(16777215,1);n.position.set(0,100,50),n.color.setHSL(Math.random(),1,.5),g.add(n);const e=new m(new q(1e4,1e4),new G({color:16777215,opacity:.5,transparent:!0}));e.rotation.x=-Math.PI/2,e.position.set(0,0,-4500),g.add(e),g.fog=new R(0,250,1e3),new _().load("./fonts/helvetiker_regular.typeface.json",function(c){const t=new j("Three.js",{font:c,size:50,height:20,bevelEnabled:!0,bevelSize:1.5,curveSegments:4,bevelThickness:2});t.computeBoundingBox();const i=(t.boundingBox.max.x-t.boundingBox.min.x)/2,a=[new M({color:16777215,flatShading:!0}),new M({color:16777215})],h=new m(t,a);h.position.set(-i,30,-10),g.add(h);const d=new m(t,a);d.position.set(-i,-20,10),d.rotation.x=Math.PI,g.add(d)})}function T(){w.render(g,x),D.update(),requestAnimationFrame(T)}