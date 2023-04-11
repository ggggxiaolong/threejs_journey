(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const t of s)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(s){const t={};return s.integrity&&(t.integrity=s.integrity),s.referrerpolicy&&(t.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?t.credentials="include":s.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(s){if(s.ep)return;s.ep=!0;const t=o(s);fetch(s.href,t)}})();const p="modulepreload",E=function(_){return"/threejs_journey/"+_},d={},e=function(r,o,a){if(!o||o.length===0)return r();const s=document.getElementsByTagName("link");return Promise.all(o.map(t=>{if(t=E(t),t in d)return;d[t]=!0;const i=t.endsWith(".css"),u=i?'[rel="stylesheet"]':"";if(!!a)for(let n=s.length-1;n>=0;n--){const c=s[n];if(c.href===t&&(!i||c.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${t}"]${u}`))return;const l=document.createElement("link");if(l.rel=i?"stylesheet":p,i||(l.as="script",l.crossOrigin=""),l.href=t,document.head.appendChild(l),i)return new Promise((n,c)=>{l.addEventListener("load",n),l.addEventListener("error",()=>c(new Error(`Unable to preload CSS for ${t}`)))})})).then(()=>r())},P=(_,r)=>{const o=_[r];return o?typeof o=="function"?o():Promise.resolve(o):new Promise((a,s)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(s.bind(null,new Error("Unknown variable dynamic import: "+r)))})};const h=new URLSearchParams(window.location.search),m=h.get("q"),f=new Map([["basic","01-basic"],["sport-light","02-sport-light"],["helper-gui","03-helper-gui"],["raycast","04-raycast"],["oimoPhysics","05-oimoPhysics"],["shadowmap-viewer","06-shadowmap-viewer"],["animation","07-animation"],["load-glb","08-load-glb"],["littlest-tokyo","09-littlest-tokyo"],["clipping","10-clipping"],["skybox","12-skybox"],["pdb","15-pdb"],["extrude","16-extrude"],["text","17-text"],["texture","18-texture"],["dynamic","19-dynamic"],["morgh","20-morgh"],["temple","21-temple"],["points","22-points"],["shaders","23-shaders"],["shader-simple","24-shader-simple"],["shader_points_raycaster","25-shader_points_raycaster"],["shader-filmPass-bloomPass","26-shader-filmPass-bloomPass"],["glitchPass","27-glitchPass"],["outlinepass-fxaashader","28-outlinepass-fxaashader"],["blender-demo1","blender-demo1"],["blender-demo2","blender-demo2"],["blender-class1","blender-class1"],["blender-cabin","blender-cabin"],["blender-clip","blender-clip"]]);if(m){const _=f.get(m);_?P(Object.assign({"./class/01-basic.ts":()=>e(()=>import("./01-basic-23994731.js"),["assets/01-basic-23994731.js","assets/three.module-67558082.js","assets/OrbitControls-3d27026f.js"]),"./class/02-sport-light.ts":()=>e(()=>import("./02-sport-light-4ba866df.js"),["assets/02-sport-light-4ba866df.js","assets/three.module-67558082.js","assets/model-76944e9e.js"]),"./class/03-helper-gui.ts":()=>e(()=>import("./03-helper-gui-1c1e0be4.js"),["assets/03-helper-gui-1c1e0be4.js","assets/three.module-67558082.js","assets/OrbitControls-3d27026f.js","assets/model-76944e9e.js","assets/lil-gui.esm-1e0f7d72.js"]),"./class/04-raycast.ts":()=>e(()=>import("./04-raycast-74b4a3d5.js"),["assets/04-raycast-74b4a3d5.js","assets/three.module-67558082.js","assets/model-76944e9e.js","assets/OrbitControls-3d27026f.js"]),"./class/05-oimoPhysics.ts":()=>e(()=>import("./05-oimoPhysics-b9f570b4.js"),["assets/05-oimoPhysics-b9f570b4.js","assets/three.module-67558082.js","assets/model-76944e9e.js","assets/OrbitControls-3d27026f.js"]),"./class/06-shadowmap-viewer.ts":()=>e(()=>import("./06-shadowmap-viewer-e0d4c1ab.js"),["assets/06-shadowmap-viewer-e0d4c1ab.js","assets/lil-gui.esm-1e0f7d72.js","assets/three.module-67558082.js","assets/OrbitControls-3d27026f.js","assets/model-76944e9e.js"]),"./class/07-animation.ts":()=>e(()=>import("./07-animation-a90dd4bd.js"),["assets/07-animation-a90dd4bd.js","assets/three.module-67558082.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js"]),"./class/08-load-glb.ts":()=>e(()=>import("./08-load-glb-2287c130.js"),["assets/08-load-glb-2287c130.js","assets/three.module-67558082.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js","assets/GLTFLoader-05c08bfa.js","assets/lil-gui.esm-1e0f7d72.js"]),"./class/09-littlest-tokyo.ts":()=>e(()=>import("./09-littlest-tokyo-76241cb3.js"),["assets/09-littlest-tokyo-76241cb3.js","assets/three.module-67558082.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js","assets/GLTFLoader-05c08bfa.js","assets/RoomEnvironment-3dce7885.js"]),"./class/10-clipping.ts":()=>e(()=>import("./10-clipping-7ad39f51.js"),["assets/10-clipping-7ad39f51.js","assets/three.module-67558082.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js"]),"./class/12-skybox.ts":()=>e(()=>import("./12-skybox-1910e7f0.js"),["assets/12-skybox-1910e7f0.js","assets/three.module-67558082.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js"]),"./class/15-pdb.ts":()=>e(()=>import("./15-pdb-2fc6f2aa.js"),["assets/15-pdb-2fc6f2aa.js","assets/three.module-67558082.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js","assets/CSS2DRenderer-d82d42d3.js","assets/model-76944e9e.js","assets/lil-gui.esm-1e0f7d72.js"]),"./class/16-extrude.ts":()=>e(()=>import("./16-extrude-9950bf5a.js"),["assets/16-extrude-9950bf5a.js","assets/three.module-67558082.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js"]),"./class/17-text.ts":()=>e(()=>import("./17-text-a8dff23d.js"),["assets/17-text-a8dff23d.js","assets/three.module-67558082.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js"]),"./class/18-texture.ts":()=>e(()=>import("./18-texture-432e86db.js"),["assets/18-texture-432e86db.js","assets/three.module-67558082.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js"]),"./class/19-dynamic.ts":()=>e(()=>import("./19-dynamic-568815d1.js"),["assets/19-dynamic-568815d1.js","assets/three.module-67558082.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js"]),"./class/20-morgh.ts":()=>e(()=>import("./20-morgh-299dbcd3.js"),["assets/20-morgh-299dbcd3.js","assets/three.module-67558082.js","assets/GLTFLoader-05c08bfa.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js","assets/lil-gui.esm-1e0f7d72.js"]),"./class/21-temple.ts":()=>e(()=>import("./21-temple-51a3d2dc.js"),["assets/21-temple-51a3d2dc.js","assets/three.module-67558082.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js"]),"./class/22-points.ts":()=>e(()=>import("./22-points-f43187fb.js"),["assets/22-points-f43187fb.js","assets/three.module-67558082.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js","assets/lil-gui.esm-1e0f7d72.js"]),"./class/23-shaders.ts":()=>e(()=>import("./23-shaders-d606097a.js"),["assets/23-shaders-d606097a.js","assets/three.module-67558082.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js","assets/lil-gui.esm-1e0f7d72.js"]),"./class/24-shader-simple.ts":()=>e(()=>import("./24-shader-simple-d2f58bdd.js"),["assets/24-shader-simple-d2f58bdd.js","assets/three.module-67558082.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js"]),"./class/25-shader_points_raycaster.ts":()=>e(()=>import("./25-shader_points_raycaster-abbf2796.js"),["assets/25-shader_points_raycaster-abbf2796.js","assets/three.module-67558082.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js"]),"./class/26-shader-filmPass-bloomPass.ts":()=>e(()=>import("./26-shader-filmPass-bloomPass-dfd28372.js"),["assets/26-shader-filmPass-bloomPass-dfd28372.js","assets/three.module-67558082.js","assets/RenderPass-c121d6a5.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js"]),"./class/27-glitchPass.ts":()=>e(()=>import("./27-glitchPass-1be81e59.js"),["assets/27-glitchPass-1be81e59.js","assets/three.module-67558082.js","assets/RenderPass-c121d6a5.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js"]),"./class/28-outlinepass-fxaashader.ts":()=>e(()=>import("./28-outlinepass-fxaashader-9e2a4dec.js"),["assets/28-outlinepass-fxaashader-9e2a4dec.js","assets/three.module-67558082.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js","assets/RenderPass-c121d6a5.js"]),"./class/blender-cabin.ts":()=>e(()=>import("./blender-cabin-d8ecd341.js"),["assets/blender-cabin-d8ecd341.js","assets/three.module-67558082.js","assets/GLTFLoader-05c08bfa.js","assets/RoomEnvironment-3dce7885.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js","assets/CSS2DRenderer-d82d42d3.js","assets/lil-gui.esm-1e0f7d72.js"]),"./class/blender-city.ts":()=>e(()=>import("./blender-city-3f5f523e.js"),["assets/blender-city-3f5f523e.js","assets/three.module-67558082.js","assets/GLTFLoader-05c08bfa.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js"]),"./class/blender-class1.ts":()=>e(()=>import("./blender-class1-c14d3d87.js"),["assets/blender-class1-c14d3d87.js","assets/three.module-67558082.js","assets/GLTFLoader-05c08bfa.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js"]),"./class/blender-clip.ts":()=>e(()=>import("./blender-clip-d3150662.js"),["assets/blender-clip-d3150662.js","assets/three.module-67558082.js","assets/GLTFLoader-05c08bfa.js","assets/RoomEnvironment-3dce7885.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js","assets/CSS2DRenderer-d82d42d3.js"]),"./class/blender-demo1.ts":()=>e(()=>import("./blender-demo1-9ae3219c.js"),["assets/blender-demo1-9ae3219c.js","assets/three.module-67558082.js","assets/GLTFLoader-05c08bfa.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js"]),"./class/blender-demo2.ts":()=>e(()=>import("./blender-demo2-bfee8f20.js"),["assets/blender-demo2-bfee8f20.js","assets/three.module-67558082.js","assets/GLTFLoader-05c08bfa.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js"]),"./class/blender-demo2_ani.ts":()=>e(()=>import("./blender-demo2_ani-28f8d5aa.js"),["assets/blender-demo2_ani-28f8d5aa.js","assets/three.module-67558082.js","assets/GLTFLoader-05c08bfa.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js"]),"./class/counter.ts":()=>e(()=>import("./counter-17fc2b1d.js"),[]),"./class/model.ts":()=>e(()=>import("./model-76944e9e.js"),[]),"./class/template.ts":()=>e(()=>import("./template-2b782541.js"),["assets/template-2b782541.js","assets/three.module-67558082.js","assets/model-76944e9e.js","assets/utils-612895f9.js","assets/OrbitControls-3d27026f.js"]),"./class/utils.ts":()=>e(()=>import("./utils-612895f9.js").then(r=>r.u),["assets/utils-612895f9.js","assets/three.module-67558082.js","assets/OrbitControls-3d27026f.js"])}),`./class/${_}.ts`):e(()=>import("./path-70117eb5.js"),[])}else e(()=>import("./path-70117eb5.js"),[]);export{f as N};
