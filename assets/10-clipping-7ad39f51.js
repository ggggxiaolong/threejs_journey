import{S,j as f,f as M,r as p,t as b,a as w,e as z,u as L,g as P,D as y,h as A,aA as l,V as m}from"./three.module-67558082.js";import{Size as C}from"./model-76944e9e.js";import{U as s}from"./utils-612895f9.js";import"./OrbitControls-3d27026f.js";const a=new S,c=C.getInstance(),i=s.initRenderer(c),d=s.initCamera(c),D=s.initControl(d,i);let n,r;I();R();u();function I(){a.background=new f(10066329),d.position.set(0,3,4),s.addAxesHelper(a,1),c.onResize(function(){s.onResize(c,d,i)}),n=new M({color:8449552,shininess:100,side:p});const h=new b(.4,.08,100,20);r=new w(h,n),a.add(r);const t=new w(new z(10,10),new L({color:13421772}));t.position.set(0,-1,0),t.rotation.x=-Math.PI/2,a.add(t);const g=new P(5263440,.3);a.add(g);const e=new y(16777215,1);e.position.set(0,4,0),a.add(e);const o=new A(16777215,1,100,Math.PI/8,.1);o.position.set(6,3,3),a.add(o),i.shadowMap.enabled=!0,e.castShadow=!0,e.shadow.mapSize.set(1024,1024),e.shadow.camera.near=3,e.shadow.camera.far=5.1,e.shadow.camera.left=-1,e.shadow.camera.right=1,e.shadow.camera.top=1,e.shadow.camera.bottom=-1,o.castShadow=!0,o.shadow.mapSize.set(1024,1024),o.shadow.camera.near=6,o.shadow.camera.far=9,t.receiveShadow=!0,r.castShadow=!0}function R(){const h=new l(new m(1,0,0),.2),t=new l(new m(-1,0,0),.2);n.clipShadows=!0,n.side=p,n.clippingPlanes=[h,t],i.localClippingEnabled=!0}function u(){i.render(a,d),r.rotation.y+=.02,D.update(),requestAnimationFrame(u)}
