import{E as ne,b as R,V as h,d as f,Q as ie,W as se,P as ae,A as ce}from"./three.module-67558082.js";import{O as re}from"./OrbitControls-3d27026f.js";const z={type:"change"},Y={type:"start"},Z={type:"end"};class pe extends ne{constructor(_,L){super();const e=this,n={NONE:-1,ROTATE:0,ZOOM:1,PAN:2,TOUCH_ROTATE:3,TOUCH_ZOOM_PAN:4};this.object=_,this.domElement=L,this.domElement.style.touchAction="none",this.enabled=!0,this.screen={left:0,top:0,width:0,height:0},this.rotateSpeed=1,this.zoomSpeed=1.2,this.panSpeed=.3,this.noRotate=!1,this.noZoom=!1,this.noPan=!1,this.staticMoving=!1,this.dynamicDampingFactor=.2,this.minDistance=0,this.maxDistance=1/0,this.keys=["KeyA","KeyS","KeyD"],this.mouseButtons={LEFT:R.ROTATE,MIDDLE:R.DOLLY,RIGHT:R.PAN},this.target=new h;const k=1e-6,w=new h;let r=1,i=n.NONE,a=n.NONE,D=0,x=0,A=0;const p=new h,m=new f,l=new f,X=new h,u=new f,O=new f,g=new f,j=new f,s=[],P={};this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.up0=this.object.up.clone(),this.zoom0=this.object.zoom,this.handleResize=function(){const t=e.domElement.getBoundingClientRect(),o=e.domElement.ownerDocument.documentElement;e.screen.left=t.left+window.pageXOffset-o.clientLeft,e.screen.top=t.top+window.pageYOffset-o.clientTop,e.screen.width=t.width,e.screen.height=t.height};const T=function(){const t=new f;return function(c,d){return t.set((c-e.screen.left)/e.screen.width,(d-e.screen.top)/e.screen.height),t}}(),C=function(){const t=new f;return function(c,d){return t.set((c-e.screen.width*.5-e.screen.left)/(e.screen.width*.5),(e.screen.height+2*(e.screen.top-d))/e.screen.width),t}}();this.rotateCamera=function(){const t=new h,o=new ie,c=new h,d=new h,y=new h,E=new h;return function(){E.set(l.x-m.x,l.y-m.y,0);let N=E.length();N?(p.copy(e.object.position).sub(e.target),c.copy(p).normalize(),d.copy(e.object.up).normalize(),y.crossVectors(d,c).normalize(),d.setLength(l.y-m.y),y.setLength(l.x-m.x),E.copy(d.add(y)),t.crossVectors(E,p).normalize(),N*=e.rotateSpeed,o.setFromAxisAngle(t,N),p.applyQuaternion(o),e.object.up.applyQuaternion(o),X.copy(t),A=N):!e.staticMoving&&A&&(A*=Math.sqrt(1-e.dynamicDampingFactor),p.copy(e.object.position).sub(e.target),o.setFromAxisAngle(X,A),p.applyQuaternion(o),e.object.up.applyQuaternion(o)),m.copy(l)}}(),this.zoomCamera=function(){let t;i===n.TOUCH_ZOOM_PAN?(t=D/x,D=x,e.object.isPerspectiveCamera?p.multiplyScalar(t):e.object.isOrthographicCamera?(e.object.zoom/=t,e.object.updateProjectionMatrix()):console.warn("THREE.TrackballControls: Unsupported camera type")):(t=1+(O.y-u.y)*e.zoomSpeed,t!==1&&t>0&&(e.object.isPerspectiveCamera?p.multiplyScalar(t):e.object.isOrthographicCamera?(e.object.zoom/=t,e.object.updateProjectionMatrix()):console.warn("THREE.TrackballControls: Unsupported camera type")),e.staticMoving?u.copy(O):u.y+=(O.y-u.y)*this.dynamicDampingFactor)},this.panCamera=function(){const t=new f,o=new h,c=new h;return function(){if(t.copy(j).sub(g),t.lengthSq()){if(e.object.isOrthographicCamera){const y=(e.object.right-e.object.left)/e.object.zoom/e.domElement.clientWidth,E=(e.object.top-e.object.bottom)/e.object.zoom/e.domElement.clientWidth;t.x*=y,t.y*=E}t.multiplyScalar(p.length()*e.panSpeed),c.copy(p).cross(e.object.up).setLength(t.x),c.add(o.copy(e.object.up).setLength(t.y)),e.object.position.add(c),e.target.add(c),e.staticMoving?g.copy(j):g.add(t.subVectors(j,g).multiplyScalar(e.dynamicDampingFactor))}}}(),this.checkDistances=function(){(!e.noZoom||!e.noPan)&&(p.lengthSq()>e.maxDistance*e.maxDistance&&(e.object.position.addVectors(e.target,p.setLength(e.maxDistance)),u.copy(O)),p.lengthSq()<e.minDistance*e.minDistance&&(e.object.position.addVectors(e.target,p.setLength(e.minDistance)),u.copy(O)))},this.update=function(){p.subVectors(e.object.position,e.target),e.noRotate||e.rotateCamera(),e.noZoom||e.zoomCamera(),e.noPan||e.panCamera(),e.object.position.addVectors(e.target,p),e.object.isPerspectiveCamera?(e.checkDistances(),e.object.lookAt(e.target),w.distanceToSquared(e.object.position)>k&&(e.dispatchEvent(z),w.copy(e.object.position))):e.object.isOrthographicCamera?(e.object.lookAt(e.target),(w.distanceToSquared(e.object.position)>k||r!==e.object.zoom)&&(e.dispatchEvent(z),w.copy(e.object.position),r=e.object.zoom)):console.warn("THREE.TrackballControls: Unsupported camera type")},this.reset=function(){i=n.NONE,a=n.NONE,e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.up.copy(e.up0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),p.subVectors(e.object.position,e.target),e.object.lookAt(e.target),e.dispatchEvent(z),w.copy(e.object.position),r=e.object.zoom};function H(t){e.enabled!==!1&&(s.length===0&&(e.domElement.setPointerCapture(t.pointerId),e.domElement.addEventListener("pointermove",S),e.domElement.addEventListener("pointerup",v)),te(t),t.pointerType==="touch"?J(t):W(t))}function S(t){e.enabled!==!1&&(t.pointerType==="touch"?$(t):G(t))}function v(t){e.enabled!==!1&&(t.pointerType==="touch"?ee(t):K(),B(t),s.length===0&&(e.domElement.releasePointerCapture(t.pointerId),e.domElement.removeEventListener("pointermove",S),e.domElement.removeEventListener("pointerup",v)))}function U(t){B(t)}function M(t){e.enabled!==!1&&(window.removeEventListener("keydown",M),a===n.NONE&&(t.code===e.keys[n.ROTATE]&&!e.noRotate?a=n.ROTATE:t.code===e.keys[n.ZOOM]&&!e.noZoom?a=n.ZOOM:t.code===e.keys[n.PAN]&&!e.noPan&&(a=n.PAN)))}function V(){e.enabled!==!1&&(a=n.NONE,window.addEventListener("keydown",M))}function W(t){if(i===n.NONE)switch(t.button){case e.mouseButtons.LEFT:i=n.ROTATE;break;case e.mouseButtons.MIDDLE:i=n.ZOOM;break;case e.mouseButtons.RIGHT:i=n.PAN;break}const o=a!==n.NONE?a:i;o===n.ROTATE&&!e.noRotate?(l.copy(C(t.pageX,t.pageY)),m.copy(l)):o===n.ZOOM&&!e.noZoom?(u.copy(T(t.pageX,t.pageY)),O.copy(u)):o===n.PAN&&!e.noPan&&(g.copy(T(t.pageX,t.pageY)),j.copy(g)),e.dispatchEvent(Y)}function G(t){const o=a!==n.NONE?a:i;o===n.ROTATE&&!e.noRotate?(m.copy(l),l.copy(C(t.pageX,t.pageY))):o===n.ZOOM&&!e.noZoom?O.copy(T(t.pageX,t.pageY)):o===n.PAN&&!e.noPan&&j.copy(T(t.pageX,t.pageY))}function K(){i=n.NONE,e.dispatchEvent(Z)}function q(t){if(e.enabled!==!1&&e.noZoom!==!0){switch(t.preventDefault(),t.deltaMode){case 2:u.y-=t.deltaY*.025;break;case 1:u.y-=t.deltaY*.01;break;default:u.y-=t.deltaY*25e-5;break}e.dispatchEvent(Y),e.dispatchEvent(Z)}}function J(t){switch(Q(t),s.length){case 1:i=n.TOUCH_ROTATE,l.copy(C(s[0].pageX,s[0].pageY)),m.copy(l);break;default:i=n.TOUCH_ZOOM_PAN;const o=s[0].pageX-s[1].pageX,c=s[0].pageY-s[1].pageY;x=D=Math.sqrt(o*o+c*c);const d=(s[0].pageX+s[1].pageX)/2,y=(s[0].pageY+s[1].pageY)/2;g.copy(T(d,y)),j.copy(g);break}e.dispatchEvent(Y)}function $(t){switch(Q(t),s.length){case 1:m.copy(l),l.copy(C(t.pageX,t.pageY));break;default:const o=oe(t),c=t.pageX-o.x,d=t.pageY-o.y;x=Math.sqrt(c*c+d*d);const y=(t.pageX+o.x)/2,E=(t.pageY+o.y)/2;j.copy(T(y,E));break}}function ee(t){switch(s.length){case 0:i=n.NONE;break;case 1:i=n.TOUCH_ROTATE,l.copy(C(t.pageX,t.pageY)),m.copy(l);break;case 2:i=n.TOUCH_ZOOM_PAN;for(let o=0;o<s.length;o++)if(s[o].pointerId!==t.pointerId){const c=P[s[o].pointerId];l.copy(C(c.x,c.y)),m.copy(l);break}break}e.dispatchEvent(Z)}function F(t){e.enabled!==!1&&t.preventDefault()}function te(t){s.push(t)}function B(t){delete P[t.pointerId];for(let o=0;o<s.length;o++)if(s[o].pointerId==t.pointerId){s.splice(o,1);return}}function Q(t){let o=P[t.pointerId];o===void 0&&(o=new f,P[t.pointerId]=o),o.set(t.pageX,t.pageY)}function oe(t){const o=t.pointerId===s[0].pointerId?s[1]:s[0];return P[o.pointerId]}this.dispose=function(){e.domElement.removeEventListener("contextmenu",F),e.domElement.removeEventListener("pointerdown",H),e.domElement.removeEventListener("pointercancel",U),e.domElement.removeEventListener("wheel",q),e.domElement.removeEventListener("pointermove",S),e.domElement.removeEventListener("pointerup",v),window.removeEventListener("keydown",M),window.removeEventListener("keyup",V)},this.domElement.addEventListener("contextmenu",F),this.domElement.addEventListener("pointerdown",H),this.domElement.addEventListener("pointercancel",U),this.domElement.addEventListener("wheel",q,{passive:!1}),window.addEventListener("keydown",M),window.addEventListener("keyup",V),this.handleResize(),this.update()}}var I;(b=>{function _(r,i,a){i.aspect=r.aspect,i.updateProjectionMatrix(),a.setSize(r.width,r.height)}b.onResize=_;function L(r){const i=new se({antialias:!0});return i.setSize(r.width,r.height),i.setPixelRatio(r.pixelRatio),document.body.appendChild(i.domElement),i}b.initRenderer=L;function e(r,i=50,a=1e3){return new ae(i,r.aspect,.1,a)}b.initCamera=e;function n(r,i=1){const a=new ce(i);return r.add(a),a}b.addAxesHelper=n;function k(r,i){const a=new re(r,i.domElement);return a.enableDamping=!0,a}b.initControl=k;function w(r,i){const a=new pe(r,i.domElement);return a.handleResize(),a}b.initTrackBallControl=w})(I||(I={}));const ue=Object.freeze(Object.defineProperty({__proto__:null,get Util(){return I}},Symbol.toStringTag,{value:"Module"}));export{pe as T,I as U,ue as u};
