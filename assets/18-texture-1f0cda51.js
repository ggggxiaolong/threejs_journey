import{S as m,s as d,a4 as u,M as f,a as l,B as p}from"./three.module-2fef69e5.js";import{Size as w}from"./model-76944e9e.js";import{U as r}from"./utils-315ca8db.js";import"./OrbitControls-916b91d8.js";const e=w.getInstance(),a=new m,t=r.initCamera(e),o=r.initRenderer(e);let n;x();i();function x(){t.position.set(0,0,500),e.onResize(function(){r.onResize(e,t,o)}),o.outputEncoding=d;const s=new u().load("./textures/crate.gif"),c=new f({map:s});n=new l(new p(200,200,200),c),a.add(n)}function i(){o.render(a,t),n.rotation.x+=.005,n.rotation.y+=.01,requestAnimationFrame(i)}
