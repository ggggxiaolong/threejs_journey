import{S as l,j as p,g,h as c}from"./three.module-67558082.js";import{G as f}from"./GLTFLoader-05c08bfa.js";import{Size as h}from"./model-76944e9e.js";import{U as n}from"./utils-612895f9.js";import"./OrbitControls-3d27026f.js";const i=h.getInstance(),e=new l,s=n.initCamera(i),r=n.initRenderer(i),u=n.initControl(s,r),w=new f;L();d();function L(){s.position.set(0,2,20),n.addAxesHelper(e,1),i.onResize(function(){n.onResize(i,s,r)}),e.background=new p(13421772);const m=new g(16777215,3);e.add(m);const t=new c(16777215,2.5);t.position.set(-3,15,15),t.angle=Math.PI/4,t.distance=45,e.add(t);const o=new c(16777215,1);o.position.set(10,15,15),o.distance=35,o.angle=Math.PI/3,e.add(o),w.load("/models/city-export.gltf",function(a){console.log(a),a.scene.scale.set(.1,.1,.1),e.add(a.scene)})}function d(){r.render(e,s),u.update(),requestAnimationFrame(d)}
