import{S as m,s as d,$ as u,M as f,a as l,B as p}from"./three.module-67558082.js";import{Size as w}from"./model-76944e9e.js";import{U as r}from"./utils-612895f9.js";import"./OrbitControls-3d27026f.js";const e=w.getInstance(),i=new m,t=r.initCamera(e),o=r.initRenderer(e);let n;x();a();function x(){t.position.set(0,0,500),e.onResize(function(){r.onResize(e,t,o)}),o.outputEncoding=d;const s=new u().load("/textures/crate.gif"),c=new f({map:s});n=new l(new p(200,200,200),c),i.add(n)}function a(){o.render(i,t),n.rotation.x+=.005,n.rotation.y+=.01,requestAnimationFrame(a)}
