import{a1 as M,S as W,R as $,d as q,B as H,j as B,aC as E,p as J,$ as K,ae as Q}from"./three.module-67558082.js";import{Size as tt}from"./model-76944e9e.js";import{U as F}from"./utils-612895f9.js";import"./OrbitControls-3d27026f.js";function et(t,l=1e-4){l=Math.max(l,Number.EPSILON);const u={},a=t.getIndex(),w=t.getAttribute("position"),I=a?a.count:w.count;let n=0;const m=Object.keys(t.attributes),P={},b={},y=[],T=["getX","getY","getZ","getW"],O=["setX","setY","setZ","setW"];for(let o=0,r=m.length;o<r;o++){const i=m[o],e=t.attributes[i];P[i]=new M(new e.array.constructor(e.count*e.itemSize),e.itemSize,e.normalized);const s=t.morphAttributes[i];s&&(b[i]=new M(new s.array.constructor(s.count*s.itemSize),s.itemSize,s.normalized))}const V=Math.log10(1/l),Y=Math.pow(10,V);for(let o=0;o<I;o++){const r=a?a.getX(o):o;let i="";for(let e=0,s=m.length;e<s;e++){const d=m[e],g=t.getAttribute(d),h=g.itemSize;for(let z=0;z<h;z++)i+=`${~~(g[T[z]](r)*Y)},`}if(i in u)y.push(u[i]);else{for(let e=0,s=m.length;e<s;e++){const d=m[e],g=t.getAttribute(d),h=t.morphAttributes[d],z=g.itemSize,Z=P[d],D=b[d];for(let x=0;x<z;x++){const X=T[x],L=O[x];if(Z[L](n,g[X](r)),h)for(let C=0,G=h.length;C<G;C++)D[C][L](n,h[C][X](r))}}u[i]=n,y.push(n),n++}}const S=t.clone();for(const o in t.attributes){const r=P[o];if(S.setAttribute(o,new M(r.array.slice(0,n*r.itemSize),r.itemSize,r.normalized)),o in b)for(let i=0;i<b[o].length;i++){const e=b[o][i];S.morphAttributes[o][i]=new M(e.array.slice(0,n*e.itemSize),e.itemSize,e.normalized)}}return S.setIndex(y),S}const f=tt.getInstance(),k=new W,v=F.initCamera(f),R=F.initRenderer(f),ot=F.initControl(v,R),_=20,U=new $,j=new q(0,0);let c,A,p;it();N();function it(){v.position.set(0,0,250),f.onResize(function(){F.onResize(f,v,R)});let t=new H(200,200,200,16,16,16);t.deleteAttribute("normal"),t.deleteAttribute("uv"),c=et(t);const l=[],u=[],a=new B,w=c.getAttribute("position");for(let n=0;n<w.count;n++)a.setHSL(.01+.1*(n/w.count),1,.5),a.toArray(l,n*3),u[n]=_*.5;c.setAttribute("customColor",new E(l,3)),c.setAttribute("size",new E(u,1));const I=new J({vertexShader:`
        attribute float size;
        attribute vec3 customColor;
        varying vec3 vColor;

        void main(){
            vColor = customColor;
            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0);
            gl_PointSize = size ;
            gl_Position = projectionMatrix * mvPosition;
        }
    `,fragmentShader:`
        uniform vec3 color;
        uniform sampler2D pointTexture;
        varying vec3 vColor;
        void main(){
            gl_FragColor = vec4(color * vColor, 1.0);
            gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
            if (gl_FragColor.a < 0.9) discard;
        }
    `,uniforms:{color:{value:new B(16777215)},pointTexture:{value:new K().load("./textures/sprites/disc.png")}}});A=new Q(c,I),k.add(A)}function N(){A.rotation.x+=5e-4,A.rotation.y+=.001,U.setFromCamera(j,v);const t=U.intersectObject(A);t.length>0?p!=t[0].index&&(p=t[0].index,c.getAttribute("size").setX(p,_*1.25),c.getAttribute("size").needsUpdate=!0):p&&(c.getAttribute("size").setX(p,_),c.getAttribute("size").needsUpdate=!0,p=void 0),R.render(k,v),ot.update(),requestAnimationFrame(N)}window.addEventListener("mousemove",function(t){j.x=t.clientX/f.width*2-1,j.y=1-t.clientY/f.height*2});
