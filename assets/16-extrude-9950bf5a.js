import{S as B,j as Y,g as J,Y as K,V as t,aD as x,d,aE as y,aF as h,m as L,a as m,ag as P}from"./three.module-67558082.js";import{Size as N}from"./model-76944e9e.js";import{U as r}from"./utils-612895f9.js";import"./OrbitControls-3d27026f.js";const C=N.getInstance(),n=new B,E=r.initRenderer(C),o=r.initCamera(C,45),p=r.initTrackBallControl(o,E);O();F();Q();function O(){n.background=new Y(2236962),o.position.set(20,0,500),r.addAxesHelper(n,100),p.minDistance=200,p.maxDistance=500;const c=new J(16777215,.2);n.add(c);const a=new K(16777215,1);a.position.copy(o.position),n.add(a)}function Q(){const c=[new t(-60,-100,60),new t(-60,20,60),new t(-60,120,60),new t(60,40,-60),new t(60,-100,-60)],a=new x(c,!0,"catmullrom"),w=new Array,u=3,k=Math.PI*2/u;for(let e=0;e<u;e++){const s=k*e;w.push(new d(Math.cos(s)*20,Math.sin(s)*20))}const z=new y(w),D={steps:100,bevelEnabled:!1,extrudePath:a},I=new h(z,D),g=new L({color:16711680}),U=new m(I,g);n.add(U);const M=new Array;for(let e=0;e<10;e++)M.push(new t((e-4.5)*50,P.randFloat(-50,50),P.randFloat(-50,50)));const V={steps:200,bevelEnabled:!1,extrudePath:new x(M)},i=new Array,b=5,l=Math.PI*2/b,G=l/2;for(let e=0;e<b;e++){const s=l*e,v=l*e+G;i.push(new d(Math.cos(s)*20,Math.sin(s)*20)),i.push(new d(Math.cos(v)*10,Math.sin(v)*10))}const f=new y(i),H=new h(f,V),S=new L({color:16744448}),R=new m(H,S);n.add(R);const T=[g,S],j={depth:20,steps:1,bevelEnabled:!0,bevelThickness:1,bevelSize:4,bevelSegments:3},q=new h(f,j),A=new m(q,T);A.position.set(50,100,50),n.add(A)}function F(){E.render(n,o),p.update(),requestAnimationFrame(F)}
