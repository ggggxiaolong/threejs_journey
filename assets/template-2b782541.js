import{S as s}from"./three.module-67558082.js";import{Size as c}from"./model-76944e9e.js";import{U as e}from"./utils-612895f9.js";import"./OrbitControls-3d27026f.js";const n=c.getInstance(),o=new s,t=e.initCamera(n),i=e.initRenderer(n),a=e.initControl(t,i);m();r();function m(){t.position.set(0,2,2),e.addAxesHelper(o,1),n.onResize(function(){e.onResize(n,t,i)})}function r(){i.render(o,t),a.update(),requestAnimationFrame(r)}