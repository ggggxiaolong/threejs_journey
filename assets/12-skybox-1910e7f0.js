import{S as g,aB as h,l as w,s as x,k as f,n as z,M as R,V as d,Q as S}from"./three.module-67558082.js";import{Size as b}from"./model-76944e9e.js";import{U as e}from"./utils-612895f9.js";import"./OrbitControls-3d27026f.js";const n=b.getInstance(),i=new g,t=e.initCamera(n),o=e.initRenderer(n),y=e.initControl(t,o),B=new h,u=new w;let r;C();l();n.onResize(function(){e.onResize(n,t,o)});function C(){t.position.set(0,2,18),o.outputEncoding=x;const c=B.setPath("/textures/cube/pisa/").load(["px.png","nx.png","py.png","ny.png","pz.png","nz.png"]);i.background=c,r=new f(new z(.1),new R({color:16777215,envMap:c}),500);const M=new S,p=new d,m=new d;for(let s=0;s<500;s++){p.set(Math.random()*10-5,Math.random()*10-5,Math.random()*10-5);const a=Math.random()*3+1;m.set(a,a,a),u.compose(p,M,m),r.setMatrixAt(s,u)}i.add(r)}function l(){o.render(i,t),y.update(),requestAnimationFrame(l)}
