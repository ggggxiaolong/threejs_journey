import{S as v,V as C,G as M,aK as R,a as L,s as k,e as D,M as T,j as z,aH as F,aL as N,g as b,D as j,w as B}from"./three.module-67558082.js";import{G as H}from"./GLTFLoader-05c08bfa.js";import{Size as S}from"./model-76944e9e.js";import{U as h}from"./utils-612895f9.js";import{G as U}from"./lil-gui.esm-1e0f7d72.js";import"./OrbitControls-3d27026f.js";const f=S.getInstance(),t=new v,d=h.initCamera(f),u=h.initRenderer(f),P=h.initControl(d,u),V=new H;let l;const q=new B,a=Array(),p=Array(),K=[0,2,6,10],I=Array(),y=Array();let w=0,m=0;const A=new U,c={play:"",mixAction:""};W();function W(){d.position.set(-5,3,10),d.lookAt(new C(0,2,0)),f.onResize(()=>{h.onResize(f,d,u)}),V.load("/gltf/RobotExpressive/RobotExpressive.glb",function(r){console.log(r),t.add(r.scene),l=new M(r.scene),r.animations.forEach((e,s)=>{const g=l.clipAction(e);a.push(g),p.push(e.name),K.includes(s)?I.push(e.name):(y.push(e.name),g.clampWhenFinished=!0,g.loop=R)}),a[0].play(),c.play=p[0],c.mixAction=y[0],A.add(c,"play").options(I).onChange(function(){const e=p.indexOf(c.play);_(e)}),A.add(c,"mixAction").options(y).onChange(function(){const e=p.indexOf(c.mixAction);$(e)});const i=r.scene.getObjectByName("Head_4");if(i instanceof L&&i.morphTargetDictionary&&i.morphTargetInfluences){console.log(i);const e=Object.keys(i.morphTargetDictionary);for(let s=0;s<e.length;s++)A.add(i.morphTargetInfluences,`${s}`,0,1,.1).name(e[s])}O()}),u.outputEncoding=k;const o=new L(new D(200,200),new T({color:16777215}));o.rotation.x=-Math.PI/2,t.add(o),t.background=new z(11316396),t.fog=new F(11316396,10,50);const n=new N(200,40,0,0);n.material.opacity=.2,n.material.transparent=!0,t.add(n);const E=new b(16777215,.4);t.add(E);const x=new j(16777215,1);x.position.set(0,5,2),t.add(x)}function _(o,n=.5){a[m].fadeOut(n),m=o,a[m].reset().fadeIn(n).play()}function $(o,n=.2){w=o,a[m].fadeOut(n),a[w].reset().fadeIn(n).play(),l.addEventListener("finished",G)}function G(){a[w].fadeOut(.2),a[m].reset().fadeIn(.2).play(),l.removeEventListener("finished",G)}function O(){const o=q.getDelta();u.render(t,d),P.update(),l.update(o),requestAnimationFrame(O)}
