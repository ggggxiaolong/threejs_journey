import{W as g,S as f,P as y,A as M,e as S,f as h,a as m,C as P,g as L,h as b,i as x}from"./three.module-67558082.js";import{O as C}from"./OrbitControls-3d27026f.js";import{Size as G}from"./model-76944e9e.js";import{G as z}from"./lil-gui.esm-1e0f7d72.js";let n,e,o;const a=G.getInstance();let t,l,c,w,p;A();F();I();H();u();function A(){p=new z,n=new g,n.setSize(a.width,a.height),n.setPixelRatio(a.pixelRatio),document.body.appendChild(n.domElement),o=new f,e=new y(40,a.aspect,.1,1e3),e.position.set(-20,120,200),e.lookAt(0,0,0),o.add(e);const d=new M(20);o.add(d),w=new C(e,n.domElement)}function F(){const d=new S(260,220),s=new h({color:13421772});c=new m(d,s),c.rotation.x=-Math.PI/2,o.add(c);const i=new P(5,5,2,24,1,!1),r=new h({color:4227327});l=new m(i,r),l.position.set(0,10,0),o.add(l)}function I(){const d=new L(16777215,.2);o.add(d),t=new b(16777215,1,500,Math.PI/6,.1),t.position.set(-50,80,0),o.add(t);const s=new x(t);o.add(s);const i=p.addFolder("spot light");i.addColor(t,"color"),i.add(t,"intensity",0,1),i.add(t,"angle",0,Math.PI/2).onChange(function(){s.update()}),i.add(t,"penumbra",0,1);const r=p.addFolder("camera");r.add(e.position,"x",-1e3,1e3),r.add(e.position,"y",-1e3,1e3),r.add(e.position,"z",-1e3,1e3)}function H(){n.shadowMap.enabled=!0,t.castShadow=!0,l.castShadow=!0,c.receiveShadow=!0}function u(){n.render(o,e),w.update(),requestAnimationFrame(u)}a.onResize(function(){e.aspect=a.aspect,e.updateProjectionMatrix(),n.setSize(a.width,a.height)});