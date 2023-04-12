import{S as A,R as z,V as y,B as S,g as p,X as f,n as P,a4 as _,ad as h}from"./three.module-2fef69e5.js";import{Size as F}from"./model-76944e9e.js";import{U as a}from"./utils-315ca8db.js";import{m as R}from"./BufferGeometryUtils-de038164.js";import"./OrbitControls-916b91d8.js";const i=F.getInstance(),b=new A,s=a.initCamera(i),u=a.initRenderer(i),T=a.initControl(s,u),c=20,C=new z,l=new y(0,0);let t,n,o;L();w();function L(){s.position.set(0,0,250),i.onResize(function(){a.onResize(i,s,u)});let e=new S(200,200,200,16,16,16);e.deleteAttribute("normal"),e.deleteAttribute("uv"),t=R(e);const m=[],d=[],g=new p,v=t.getAttribute("position");for(let r=0;r<v.count;r++)g.setHSL(.01+.1*(r/v.count),1,.5),g.toArray(m,r*3),d[r]=c*.5;t.setAttribute("customColor",new f(m,3)),t.setAttribute("size",new f(d,1));const x=new P({vertexShader:`
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
    `,uniforms:{color:{value:new p(16777215)},pointTexture:{value:new _().load("./textures/sprites/disc.png")}}});n=new h(t,x),b.add(n)}function w(){n.rotation.x+=5e-4,n.rotation.y+=.001,C.setFromCamera(l,s);const e=C.intersectObject(n);e.length>0?o!=e[0].index&&(o=e[0].index,t.getAttribute("size").setX(o,c*1.25),t.getAttribute("size").needsUpdate=!0):o&&(t.getAttribute("size").setX(o,c),t.getAttribute("size").needsUpdate=!0,o=void 0),u.render(b,s),T.update(),requestAnimationFrame(w)}window.addEventListener("mousemove",function(e){l.x=e.clientX/i.width*2-1,l.y=1-e.clientY/i.height*2});
