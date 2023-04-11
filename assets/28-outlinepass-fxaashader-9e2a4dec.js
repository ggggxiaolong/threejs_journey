import{V as D,j as B,J as oe,X as ne,af as le,a9 as Z,aC as A,a7 as G,a6 as q,a5 as F,f as L,ab as J,ae as Q,a as I,d as T,aN as C,aX as ue,r as X,aY as de,aZ as K,U as ce,p as N,l as he,aR as fe,S as ge,R as pe,g as me,D as ve,e as xe,u as be,n as Me,ag as U,aS as Te}from"./three.module-67558082.js";import{Size as Se,Mouse as ye}from"./model-76944e9e.js";import{U as j}from"./utils-612895f9.js";import{P as we,C as Ee,F as Ce,E as De,S as Ae,R as Be}from"./RenderPass-c121d6a5.js";import"./OrbitControls-3d27026f.js";const Pe=/^[og]\s*(.+)?/,Oe=/^mtllib /,Ie=/^usemtl /,Re=/^usemap /,$=/\s+/,ee=new D,H=new D,te=new D,re=new D,M=new D,_=new B;function Ne(){const R={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(e,r){if(this.object&&this.object.fromDeclaration===!1){this.object.name=e,this.object.fromDeclaration=r!==!1;return}const a=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:e||"",fromDeclaration:r!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(t,i){const s=this._finalize(!1);s&&(s.inherited||s.groupCount<=0)&&this.materials.splice(s.index,1);const l={index:this.materials.length,name:t||"",mtllib:Array.isArray(i)&&i.length>0?i[i.length-1]:"",smooth:s!==void 0?s.smooth:this.smooth,groupStart:s!==void 0?s.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(u){const n={index:typeof u=="number"?u:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return n.clone=this.clone.bind(n),n}};return this.materials.push(l),l},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(t){const i=this.currentMaterial();if(i&&i.groupEnd===-1&&(i.groupEnd=this.geometry.vertices.length/3,i.groupCount=i.groupEnd-i.groupStart,i.inherited=!1),t&&this.materials.length>1)for(let s=this.materials.length-1;s>=0;s--)this.materials[s].groupCount<=0&&this.materials.splice(s,1);return t&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),i}},a&&a.name&&typeof a.clone=="function"){const t=a.clone(0);t.inherited=!0,this.object.materials.push(t)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(e,r){const a=parseInt(e,10);return(a>=0?a-1:a+r/3)*3},parseNormalIndex:function(e,r){const a=parseInt(e,10);return(a>=0?a-1:a+r/3)*3},parseUVIndex:function(e,r){const a=parseInt(e,10);return(a>=0?a-1:a+r/2)*2},addVertex:function(e,r,a){const t=this.vertices,i=this.object.geometry.vertices;i.push(t[e+0],t[e+1],t[e+2]),i.push(t[r+0],t[r+1],t[r+2]),i.push(t[a+0],t[a+1],t[a+2])},addVertexPoint:function(e){const r=this.vertices;this.object.geometry.vertices.push(r[e+0],r[e+1],r[e+2])},addVertexLine:function(e){const r=this.vertices;this.object.geometry.vertices.push(r[e+0],r[e+1],r[e+2])},addNormal:function(e,r,a){const t=this.normals,i=this.object.geometry.normals;i.push(t[e+0],t[e+1],t[e+2]),i.push(t[r+0],t[r+1],t[r+2]),i.push(t[a+0],t[a+1],t[a+2])},addFaceNormal:function(e,r,a){const t=this.vertices,i=this.object.geometry.normals;ee.fromArray(t,e),H.fromArray(t,r),te.fromArray(t,a),M.subVectors(te,H),re.subVectors(ee,H),M.cross(re),M.normalize(),i.push(M.x,M.y,M.z),i.push(M.x,M.y,M.z),i.push(M.x,M.y,M.z)},addColor:function(e,r,a){const t=this.colors,i=this.object.geometry.colors;t[e]!==void 0&&i.push(t[e+0],t[e+1],t[e+2]),t[r]!==void 0&&i.push(t[r+0],t[r+1],t[r+2]),t[a]!==void 0&&i.push(t[a+0],t[a+1],t[a+2])},addUV:function(e,r,a){const t=this.uvs,i=this.object.geometry.uvs;i.push(t[e+0],t[e+1]),i.push(t[r+0],t[r+1]),i.push(t[a+0],t[a+1])},addDefaultUV:function(){const e=this.object.geometry.uvs;e.push(0,0),e.push(0,0),e.push(0,0)},addUVLine:function(e){const r=this.uvs;this.object.geometry.uvs.push(r[e+0],r[e+1])},addFace:function(e,r,a,t,i,s,l,u,n){const d=this.vertices.length;let o=this.parseVertexIndex(e,d),c=this.parseVertexIndex(r,d),h=this.parseVertexIndex(a,d);if(this.addVertex(o,c,h),this.addColor(o,c,h),l!==void 0&&l!==""){const p=this.normals.length;o=this.parseNormalIndex(l,p),c=this.parseNormalIndex(u,p),h=this.parseNormalIndex(n,p),this.addNormal(o,c,h)}else this.addFaceNormal(o,c,h);if(t!==void 0&&t!==""){const p=this.uvs.length;o=this.parseUVIndex(t,p),c=this.parseUVIndex(i,p),h=this.parseUVIndex(s,p),this.addUV(o,c,h),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(e){this.object.geometry.type="Points";const r=this.vertices.length;for(let a=0,t=e.length;a<t;a++){const i=this.parseVertexIndex(e[a],r);this.addVertexPoint(i),this.addColor(i)}},addLineGeometry:function(e,r){this.object.geometry.type="Line";const a=this.vertices.length,t=this.uvs.length;for(let i=0,s=e.length;i<s;i++)this.addVertexLine(this.parseVertexIndex(e[i],a));for(let i=0,s=r.length;i<s;i++)this.addUVLine(this.parseUVIndex(r[i],t))}};return R.startObject("",!1),R}class Fe extends oe{constructor(e){super(e),this.materials=null}load(e,r,a,t){const i=this,s=new ne(this.manager);s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,function(l){try{r(i.parse(l))}catch(u){t?t(u):console.error(u),i.manager.itemError(e)}},a,t)}setMaterials(e){return this.materials=e,this}parse(e){const r=new Ne;e.indexOf(`\r
`)!==-1&&(e=e.replace(/\r\n/g,`
`)),e.indexOf(`\\
`)!==-1&&(e=e.replace(/\\\n/g,""));const a=e.split(`
`);let t=[];for(let l=0,u=a.length;l<u;l++){const n=a[l].trimStart();if(n.length===0)continue;const d=n.charAt(0);if(d!=="#")if(d==="v"){const o=n.split($);switch(o[0]){case"v":r.vertices.push(parseFloat(o[1]),parseFloat(o[2]),parseFloat(o[3])),o.length>=7?(_.setRGB(parseFloat(o[4]),parseFloat(o[5]),parseFloat(o[6])).convertSRGBToLinear(),r.colors.push(_.r,_.g,_.b)):r.colors.push(void 0,void 0,void 0);break;case"vn":r.normals.push(parseFloat(o[1]),parseFloat(o[2]),parseFloat(o[3]));break;case"vt":r.uvs.push(parseFloat(o[1]),parseFloat(o[2]));break}}else if(d==="f"){const c=n.slice(1).trim().split($),h=[];for(let f=0,m=c.length;f<m;f++){const v=c[f];if(v.length>0){const x=v.split("/");h.push(x)}}const p=h[0];for(let f=1,m=h.length-1;f<m;f++){const v=h[f],x=h[f+1];r.addFace(p[0],v[0],x[0],p[1],v[1],x[1],p[2],v[2],x[2])}}else if(d==="l"){const o=n.substring(1).trim().split(" ");let c=[];const h=[];if(n.indexOf("/")===-1)c=o;else for(let p=0,f=o.length;p<f;p++){const m=o[p].split("/");m[0]!==""&&c.push(m[0]),m[1]!==""&&h.push(m[1])}r.addLineGeometry(c,h)}else if(d==="p"){const c=n.slice(1).trim().split(" ");r.addPointGeometry(c)}else if((t=Pe.exec(n))!==null){const o=(" "+t[0].slice(1).trim()).slice(1);r.startObject(o)}else if(Ie.test(n))r.object.startMaterial(n.substring(7).trim(),r.materialLibraries);else if(Oe.test(n))r.materialLibraries.push(n.substring(7).trim());else if(Re.test(n))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if(d==="s"){if(t=n.split(" "),t.length>1){const c=t[1].trim().toLowerCase();r.object.smooth=c!=="0"&&c!=="off"}else r.object.smooth=!0;const o=r.object.currentMaterial();o&&(o.smooth=r.object.smooth)}else{if(n==="\0")continue;console.warn('THREE.OBJLoader: Unexpected line: "'+n+'"')}}r.finalize();const i=new le;if(i.materialLibraries=[].concat(r.materialLibraries),!(r.objects.length===1&&r.objects[0].geometry.vertices.length===0)===!0)for(let l=0,u=r.objects.length;l<u;l++){const n=r.objects[l],d=n.geometry,o=n.materials,c=d.type==="Line",h=d.type==="Points";let p=!1;if(d.vertices.length===0)continue;const f=new Z;f.setAttribute("position",new A(d.vertices,3)),d.normals.length>0&&f.setAttribute("normal",new A(d.normals,3)),d.colors.length>0&&(p=!0,f.setAttribute("color",new A(d.colors,3))),d.hasUVIndices===!0&&f.setAttribute("uv",new A(d.uvs,2));const m=[];for(let x=0,z=o.length;x<z;x++){const y=o[x],Y=y.name+"_"+y.smooth+"_"+p;let g=r.materials[Y];if(this.materials!==null){if(g=this.materials.create(y.name),c&&g&&!(g instanceof G)){const w=new G;q.prototype.copy.call(w,g),w.color.copy(g.color),g=w}else if(h&&g&&!(g instanceof F)){const w=new F({size:10,sizeAttenuation:!1});q.prototype.copy.call(w,g),w.color.copy(g.color),w.map=g.map,g=w}}g===void 0&&(c?g=new G:h?g=new F({size:1,sizeAttenuation:!1}):g=new L,g.name=y.name,g.flatShading=!y.smooth,g.vertexColors=p,r.materials[Y]=g),m.push(g)}let v;if(m.length>1){for(let x=0,z=o.length;x<z;x++){const y=o[x];f.addGroup(y.groupStart,y.groupCount,x)}c?v=new J(f,m):h?v=new Q(f,m):v=new I(f,m)}else c?v=new J(f,m[0]):h?v=new Q(f,m[0]):v=new I(f,m[0]);v.name=n.name,i.add(v)}else if(r.vertices.length>0){const l=new F({size:1,sizeAttenuation:!1}),u=new Z;u.setAttribute("position",new A(r.vertices,3)),r.colors.length>0&&r.colors[0]!==void 0&&(u.setAttribute("color",new A(r.colors,3)),l.vertexColors=!0);const n=new Q(u,l);i.add(n)}return i}}class E extends we{constructor(e,r,a,t){super(),this.renderScene=r,this.renderCamera=a,this.selectedObjects=t!==void 0?t:[],this.visibleEdgeColor=new B(1,1,1),this.hiddenEdgeColor=new B(.1,.04,.02),this.edgeGlow=0,this.usePatternTexture=!1,this.edgeThickness=1,this.edgeStrength=3,this.downSampleRatio=2,this.pulsePeriod=0,this._visibilityCache=new Map,this.resolution=e!==void 0?new T(e.x,e.y):new T(256,256);const i=Math.round(this.resolution.x/this.downSampleRatio),s=Math.round(this.resolution.y/this.downSampleRatio);this.renderTargetMaskBuffer=new C(this.resolution.x,this.resolution.y),this.renderTargetMaskBuffer.texture.name="OutlinePass.mask",this.renderTargetMaskBuffer.texture.generateMipmaps=!1,this.depthMaterial=new ue,this.depthMaterial.side=X,this.depthMaterial.depthPacking=de,this.depthMaterial.blending=K,this.prepareMaskMaterial=this.getPrepareMaskMaterial(),this.prepareMaskMaterial.side=X,this.prepareMaskMaterial.fragmentShader=d(this.prepareMaskMaterial.fragmentShader,this.renderCamera),this.renderTargetDepthBuffer=new C(this.resolution.x,this.resolution.y),this.renderTargetDepthBuffer.texture.name="OutlinePass.depth",this.renderTargetDepthBuffer.texture.generateMipmaps=!1,this.renderTargetMaskDownSampleBuffer=new C(i,s),this.renderTargetMaskDownSampleBuffer.texture.name="OutlinePass.depthDownSample",this.renderTargetMaskDownSampleBuffer.texture.generateMipmaps=!1,this.renderTargetBlurBuffer1=new C(i,s),this.renderTargetBlurBuffer1.texture.name="OutlinePass.blur1",this.renderTargetBlurBuffer1.texture.generateMipmaps=!1,this.renderTargetBlurBuffer2=new C(Math.round(i/2),Math.round(s/2)),this.renderTargetBlurBuffer2.texture.name="OutlinePass.blur2",this.renderTargetBlurBuffer2.texture.generateMipmaps=!1,this.edgeDetectionMaterial=this.getEdgeDetectionMaterial(),this.renderTargetEdgeBuffer1=new C(i,s),this.renderTargetEdgeBuffer1.texture.name="OutlinePass.edge1",this.renderTargetEdgeBuffer1.texture.generateMipmaps=!1,this.renderTargetEdgeBuffer2=new C(Math.round(i/2),Math.round(s/2)),this.renderTargetEdgeBuffer2.texture.name="OutlinePass.edge2",this.renderTargetEdgeBuffer2.texture.generateMipmaps=!1;const l=4,u=4;this.separableBlurMaterial1=this.getSeperableBlurMaterial(l),this.separableBlurMaterial1.uniforms.texSize.value.set(i,s),this.separableBlurMaterial1.uniforms.kernelRadius.value=1,this.separableBlurMaterial2=this.getSeperableBlurMaterial(u),this.separableBlurMaterial2.uniforms.texSize.value.set(Math.round(i/2),Math.round(s/2)),this.separableBlurMaterial2.uniforms.kernelRadius.value=u,this.overlayMaterial=this.getOverlayMaterial();const n=Ee;this.copyUniforms=ce.clone(n.uniforms),this.copyUniforms.opacity.value=1,this.materialCopy=new N({uniforms:this.copyUniforms,vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,blending:K,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new B,this.oldClearAlpha=1,this.fsQuad=new Ce(null),this.tempPulseColor1=new B,this.tempPulseColor2=new B,this.textureMatrix=new he;function d(o,c){const h=c.isPerspectiveCamera?"perspective":"orthographic";return o.replace(/DEPTH_TO_VIEW_Z/g,h+"DepthToViewZ")}}dispose(){this.renderTargetMaskBuffer.dispose(),this.renderTargetDepthBuffer.dispose(),this.renderTargetMaskDownSampleBuffer.dispose(),this.renderTargetBlurBuffer1.dispose(),this.renderTargetBlurBuffer2.dispose(),this.renderTargetEdgeBuffer1.dispose(),this.renderTargetEdgeBuffer2.dispose(),this.depthMaterial.dispose(),this.prepareMaskMaterial.dispose(),this.edgeDetectionMaterial.dispose(),this.separableBlurMaterial1.dispose(),this.separableBlurMaterial2.dispose(),this.overlayMaterial.dispose(),this.materialCopy.dispose(),this.fsQuad.dispose()}setSize(e,r){this.renderTargetMaskBuffer.setSize(e,r),this.renderTargetDepthBuffer.setSize(e,r);let a=Math.round(e/this.downSampleRatio),t=Math.round(r/this.downSampleRatio);this.renderTargetMaskDownSampleBuffer.setSize(a,t),this.renderTargetBlurBuffer1.setSize(a,t),this.renderTargetEdgeBuffer1.setSize(a,t),this.separableBlurMaterial1.uniforms.texSize.value.set(a,t),a=Math.round(a/2),t=Math.round(t/2),this.renderTargetBlurBuffer2.setSize(a,t),this.renderTargetEdgeBuffer2.setSize(a,t),this.separableBlurMaterial2.uniforms.texSize.value.set(a,t)}changeVisibilityOfSelectedObjects(e){const r=this._visibilityCache;function a(t){t.isMesh&&(e===!0?t.visible=r.get(t):(r.set(t,t.visible),t.visible=e))}for(let t=0;t<this.selectedObjects.length;t++)this.selectedObjects[t].traverse(a)}changeVisibilityOfNonSelectedObjects(e){const r=this._visibilityCache,a=[];function t(s){s.isMesh&&a.push(s)}for(let s=0;s<this.selectedObjects.length;s++)this.selectedObjects[s].traverse(t);function i(s){if(s.isMesh||s.isSprite){let l=!1;for(let u=0;u<a.length;u++)if(a[u].id===s.id){l=!0;break}if(l===!1){const u=s.visible;(e===!1||r.get(s)===!0)&&(s.visible=e),r.set(s,u)}}else(s.isPoints||s.isLine)&&(e===!0?s.visible=r.get(s):(r.set(s,s.visible),s.visible=e))}this.renderScene.traverse(i)}updateTextureMatrix(){this.textureMatrix.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.textureMatrix.multiply(this.renderCamera.projectionMatrix),this.textureMatrix.multiply(this.renderCamera.matrixWorldInverse)}render(e,r,a,t,i){if(this.selectedObjects.length>0){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const s=e.autoClear;e.autoClear=!1,i&&e.state.buffers.stencil.setTest(!1),e.setClearColor(16777215,1),this.changeVisibilityOfSelectedObjects(!1);const l=this.renderScene.background;if(this.renderScene.background=null,this.renderScene.overrideMaterial=this.depthMaterial,e.setRenderTarget(this.renderTargetDepthBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this.changeVisibilityOfSelectedObjects(!0),this._visibilityCache.clear(),this.updateTextureMatrix(),this.changeVisibilityOfNonSelectedObjects(!1),this.renderScene.overrideMaterial=this.prepareMaskMaterial,this.prepareMaskMaterial.uniforms.cameraNearFar.value.set(this.renderCamera.near,this.renderCamera.far),this.prepareMaskMaterial.uniforms.depthTexture.value=this.renderTargetDepthBuffer.texture,this.prepareMaskMaterial.uniforms.textureMatrix.value=this.textureMatrix,e.setRenderTarget(this.renderTargetMaskBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this.renderScene.overrideMaterial=null,this.changeVisibilityOfNonSelectedObjects(!0),this._visibilityCache.clear(),this.renderScene.background=l,this.fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=this.renderTargetMaskBuffer.texture,e.setRenderTarget(this.renderTargetMaskDownSampleBuffer),e.clear(),this.fsQuad.render(e),this.tempPulseColor1.copy(this.visibleEdgeColor),this.tempPulseColor2.copy(this.hiddenEdgeColor),this.pulsePeriod>0){const u=.625+Math.cos(performance.now()*.01/this.pulsePeriod)*.75/2;this.tempPulseColor1.multiplyScalar(u),this.tempPulseColor2.multiplyScalar(u)}this.fsQuad.material=this.edgeDetectionMaterial,this.edgeDetectionMaterial.uniforms.maskTexture.value=this.renderTargetMaskDownSampleBuffer.texture,this.edgeDetectionMaterial.uniforms.texSize.value.set(this.renderTargetMaskDownSampleBuffer.width,this.renderTargetMaskDownSampleBuffer.height),this.edgeDetectionMaterial.uniforms.visibleEdgeColor.value=this.tempPulseColor1,this.edgeDetectionMaterial.uniforms.hiddenEdgeColor.value=this.tempPulseColor2,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.separableBlurMaterial1,this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=E.BlurDirectionX,this.separableBlurMaterial1.uniforms.kernelRadius.value=this.edgeThickness,e.setRenderTarget(this.renderTargetBlurBuffer1),e.clear(),this.fsQuad.render(e),this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetBlurBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=E.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.separableBlurMaterial2,this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial2.uniforms.direction.value=E.BlurDirectionX,e.setRenderTarget(this.renderTargetBlurBuffer2),e.clear(),this.fsQuad.render(e),this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetBlurBuffer2.texture,this.separableBlurMaterial2.uniforms.direction.value=E.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer2),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.overlayMaterial,this.overlayMaterial.uniforms.maskTexture.value=this.renderTargetMaskBuffer.texture,this.overlayMaterial.uniforms.edgeTexture1.value=this.renderTargetEdgeBuffer1.texture,this.overlayMaterial.uniforms.edgeTexture2.value=this.renderTargetEdgeBuffer2.texture,this.overlayMaterial.uniforms.patternTexture.value=this.patternTexture,this.overlayMaterial.uniforms.edgeStrength.value=this.edgeStrength,this.overlayMaterial.uniforms.edgeGlow.value=this.edgeGlow,this.overlayMaterial.uniforms.usePatternTexture.value=this.usePatternTexture,i&&e.state.buffers.stencil.setTest(!0),e.setRenderTarget(a),this.fsQuad.render(e),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=s}this.renderToScreen&&(this.fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=a.texture,e.setRenderTarget(null),this.fsQuad.render(e))}getPrepareMaskMaterial(){return new N({uniforms:{depthTexture:{value:null},cameraNearFar:{value:new T(.5,.5)},textureMatrix:{value:null}},vertexShader:`#include <morphtarget_pars_vertex>
				#include <skinning_pars_vertex>

				varying vec4 projTexCoord;
				varying vec4 vPosition;
				uniform mat4 textureMatrix;

				void main() {

					#include <skinbase_vertex>
					#include <begin_vertex>
					#include <morphtarget_vertex>
					#include <skinning_vertex>
					#include <project_vertex>

					vPosition = mvPosition;

					vec4 worldPosition = vec4( transformed, 1.0 );

					#ifdef USE_INSTANCING

						worldPosition = instanceMatrix * worldPosition;

					#endif
					
					worldPosition = modelMatrix * worldPosition;

					projTexCoord = textureMatrix * worldPosition;

				}`,fragmentShader:`#include <packing>
				varying vec4 vPosition;
				varying vec4 projTexCoord;
				uniform sampler2D depthTexture;
				uniform vec2 cameraNearFar;

				void main() {

					float depth = unpackRGBAToDepth(texture2DProj( depthTexture, projTexCoord ));
					float viewZ = - DEPTH_TO_VIEW_Z( depth, cameraNearFar.x, cameraNearFar.y );
					float depthTest = (-vPosition.z > viewZ) ? 1.0 : 0.0;
					gl_FragColor = vec4(0.0, depthTest, 1.0, 1.0);

				}`})}getEdgeDetectionMaterial(){return new N({uniforms:{maskTexture:{value:null},texSize:{value:new T(.5,.5)},visibleEdgeColor:{value:new D(1,1,1)},hiddenEdgeColor:{value:new D(1,1,1)}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;

				uniform sampler2D maskTexture;
				uniform vec2 texSize;
				uniform vec3 visibleEdgeColor;
				uniform vec3 hiddenEdgeColor;

				void main() {
					vec2 invSize = 1.0 / texSize;
					vec4 uvOffset = vec4(1.0, 0.0, 0.0, 1.0) * vec4(invSize, invSize);
					vec4 c1 = texture2D( maskTexture, vUv + uvOffset.xy);
					vec4 c2 = texture2D( maskTexture, vUv - uvOffset.xy);
					vec4 c3 = texture2D( maskTexture, vUv + uvOffset.yw);
					vec4 c4 = texture2D( maskTexture, vUv - uvOffset.yw);
					float diff1 = (c1.r - c2.r)*0.5;
					float diff2 = (c3.r - c4.r)*0.5;
					float d = length( vec2(diff1, diff2) );
					float a1 = min(c1.g, c2.g);
					float a2 = min(c3.g, c4.g);
					float visibilityFactor = min(a1, a2);
					vec3 edgeColor = 1.0 - visibilityFactor > 0.001 ? visibleEdgeColor : hiddenEdgeColor;
					gl_FragColor = vec4(edgeColor, 1.0) * vec4(d);
				}`})}getSeperableBlurMaterial(e){return new N({defines:{MAX_RADIUS:e},uniforms:{colorTexture:{value:null},texSize:{value:new T(.5,.5)},direction:{value:new T(.5,.5)},kernelRadius:{value:1}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;
				uniform float kernelRadius;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}

				void main() {
					vec2 invSize = 1.0 / texSize;
					float sigma = kernelRadius/2.0;
					float weightSum = gaussianPdf(0.0, sigma);
					vec4 diffuseSum = texture2D( colorTexture, vUv) * weightSum;
					vec2 delta = direction * invSize * kernelRadius/float(MAX_RADIUS);
					vec2 uvOffset = delta;
					for( int i = 1; i <= MAX_RADIUS; i ++ ) {
						float x = kernelRadius * float(i) / float(MAX_RADIUS);
						float w = gaussianPdf(x, sigma);
						vec4 sample1 = texture2D( colorTexture, vUv + uvOffset);
						vec4 sample2 = texture2D( colorTexture, vUv - uvOffset);
						diffuseSum += ((sample1 + sample2) * w);
						weightSum += (2.0 * w);
						uvOffset += delta;
					}
					gl_FragColor = diffuseSum/weightSum;
				}`})}getOverlayMaterial(){return new N({uniforms:{maskTexture:{value:null},edgeTexture1:{value:null},edgeTexture2:{value:null},patternTexture:{value:null},edgeStrength:{value:1},edgeGlow:{value:1},usePatternTexture:{value:0}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;

				uniform sampler2D maskTexture;
				uniform sampler2D edgeTexture1;
				uniform sampler2D edgeTexture2;
				uniform sampler2D patternTexture;
				uniform float edgeStrength;
				uniform float edgeGlow;
				uniform bool usePatternTexture;

				void main() {
					vec4 edgeValue1 = texture2D(edgeTexture1, vUv);
					vec4 edgeValue2 = texture2D(edgeTexture2, vUv);
					vec4 maskColor = texture2D(maskTexture, vUv);
					vec4 patternColor = texture2D(patternTexture, 6.0 * vUv);
					float visibilityFactor = 1.0 - maskColor.g > 0.0 ? 1.0 : 0.5;
					vec4 edgeValue = edgeValue1 + edgeValue2 * edgeGlow;
					vec4 finalColor = edgeStrength * maskColor.r * edgeValue;
					if(usePatternTexture)
						finalColor += + visibilityFactor * (1.0 - maskColor.r) * (1.0 - patternColor.r);
					gl_FragColor = finalColor;
				}`,blending:fe,depthTest:!1,depthWrite:!1,transparent:!0})}}E.BlurDirectionX=new T(1,0);E.BlurDirectionY=new T(0,1);const Ue={uniforms:{tDiffuse:{value:null},resolution:{value:new T(1/1024,1/512)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	precision highp float;

	uniform sampler2D tDiffuse;

	uniform vec2 resolution;

	varying vec2 vUv;

	// FXAA 3.11 implementation by NVIDIA, ported to WebGL by Agost Biro (biro@archilogic.com)

	//----------------------------------------------------------------------------------
	// File:        es3-keplerFXAAassetsshaders/FXAA_DefaultES.frag
	// SDK Version: v3.00
	// Email:       gameworks@nvidia.com
	// Site:        http://developer.nvidia.com/
	//
	// Copyright (c) 2014-2015, NVIDIA CORPORATION. All rights reserved.
	//
	// Redistribution and use in source and binary forms, with or without
	// modification, are permitted provided that the following conditions
	// are met:
	//  * Redistributions of source code must retain the above copyright
	//    notice, this list of conditions and the following disclaimer.
	//  * Redistributions in binary form must reproduce the above copyright
	//    notice, this list of conditions and the following disclaimer in the
	//    documentation and/or other materials provided with the distribution.
	//  * Neither the name of NVIDIA CORPORATION nor the names of its
	//    contributors may be used to endorse or promote products derived
	//    from this software without specific prior written permission.
	//
	// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS ''AS IS'' AND ANY
	// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
	// PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
	// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
	// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
	// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
	// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
	// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	//
	//----------------------------------------------------------------------------------

	#ifndef FXAA_DISCARD
			//
			// Only valid for PC OpenGL currently.
			// Probably will not work when FXAA_GREEN_AS_LUMA = 1.
			//
			// 1 = Use discard on pixels which don't need AA.
			//     For APIs which enable concurrent TEX+ROP from same surface.
			// 0 = Return unchanged color on pixels which don't need AA.
			//
			#define FXAA_DISCARD 0
	#endif

	/*--------------------------------------------------------------------------*/
	#define FxaaTexTop(t, p) texture2D(t, p, -100.0)
	#define FxaaTexOff(t, p, o, r) texture2D(t, p + (o * r), -100.0)
	/*--------------------------------------------------------------------------*/

	#define NUM_SAMPLES 5

	// assumes colors have premultipliedAlpha, so that the calculated color contrast is scaled by alpha
	float contrast( vec4 a, vec4 b ) {
			vec4 diff = abs( a - b );
			return max( max( max( diff.r, diff.g ), diff.b ), diff.a );
	}

	/*============================================================================

									FXAA3 QUALITY - PC

	============================================================================*/

	/*--------------------------------------------------------------------------*/
	vec4 FxaaPixelShader(
			vec2 posM,
			sampler2D tex,
			vec2 fxaaQualityRcpFrame,
			float fxaaQualityEdgeThreshold,
			float fxaaQualityinvEdgeThreshold
	) {
			vec4 rgbaM = FxaaTexTop(tex, posM);
			vec4 rgbaS = FxaaTexOff(tex, posM, vec2( 0.0, 1.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaE = FxaaTexOff(tex, posM, vec2( 1.0, 0.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaN = FxaaTexOff(tex, posM, vec2( 0.0,-1.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaW = FxaaTexOff(tex, posM, vec2(-1.0, 0.0), fxaaQualityRcpFrame.xy);
			// . S .
			// W M E
			// . N .

			bool earlyExit = max( max( max(
					contrast( rgbaM, rgbaN ),
					contrast( rgbaM, rgbaS ) ),
					contrast( rgbaM, rgbaE ) ),
					contrast( rgbaM, rgbaW ) )
					< fxaaQualityEdgeThreshold;
			// . 0 .
			// 0 0 0
			// . 0 .

			#if (FXAA_DISCARD == 1)
					if(earlyExit) FxaaDiscard;
			#else
					if(earlyExit) return rgbaM;
			#endif

			float contrastN = contrast( rgbaM, rgbaN );
			float contrastS = contrast( rgbaM, rgbaS );
			float contrastE = contrast( rgbaM, rgbaE );
			float contrastW = contrast( rgbaM, rgbaW );

			float relativeVContrast = ( contrastN + contrastS ) - ( contrastE + contrastW );
			relativeVContrast *= fxaaQualityinvEdgeThreshold;

			bool horzSpan = relativeVContrast > 0.;
			// . 1 .
			// 0 0 0
			// . 1 .

			// 45 deg edge detection and corners of objects, aka V/H contrast is too similar
			if( abs( relativeVContrast ) < .3 ) {
					// locate the edge
					vec2 dirToEdge;
					dirToEdge.x = contrastE > contrastW ? 1. : -1.;
					dirToEdge.y = contrastS > contrastN ? 1. : -1.;
					// . 2 .      . 1 .
					// 1 0 2  ~=  0 0 1
					// . 1 .      . 0 .

					// tap 2 pixels and see which ones are "outside" the edge, to
					// determine if the edge is vertical or horizontal

					vec4 rgbaAlongH = FxaaTexOff(tex, posM, vec2( dirToEdge.x, -dirToEdge.y ), fxaaQualityRcpFrame.xy);
					float matchAlongH = contrast( rgbaM, rgbaAlongH );
					// . 1 .
					// 0 0 1
					// . 0 H

					vec4 rgbaAlongV = FxaaTexOff(tex, posM, vec2( -dirToEdge.x, dirToEdge.y ), fxaaQualityRcpFrame.xy);
					float matchAlongV = contrast( rgbaM, rgbaAlongV );
					// V 1 .
					// 0 0 1
					// . 0 .

					relativeVContrast = matchAlongV - matchAlongH;
					relativeVContrast *= fxaaQualityinvEdgeThreshold;

					if( abs( relativeVContrast ) < .3 ) { // 45 deg edge
							// 1 1 .
							// 0 0 1
							// . 0 1

							// do a simple blur
							return mix(
									rgbaM,
									(rgbaN + rgbaS + rgbaE + rgbaW) * .25,
									.4
							);
					}

					horzSpan = relativeVContrast > 0.;
			}

			if(!horzSpan) rgbaN = rgbaW;
			if(!horzSpan) rgbaS = rgbaE;
			// . 0 .      1
			// 1 0 1  ->  0
			// . 0 .      1

			bool pairN = contrast( rgbaM, rgbaN ) > contrast( rgbaM, rgbaS );
			if(!pairN) rgbaN = rgbaS;

			vec2 offNP;
			offNP.x = (!horzSpan) ? 0.0 : fxaaQualityRcpFrame.x;
			offNP.y = ( horzSpan) ? 0.0 : fxaaQualityRcpFrame.y;

			bool doneN = false;
			bool doneP = false;

			float nDist = 0.;
			float pDist = 0.;

			vec2 posN = posM;
			vec2 posP = posM;

			int iterationsUsed = 0;
			int iterationsUsedN = 0;
			int iterationsUsedP = 0;
			for( int i = 0; i < NUM_SAMPLES; i++ ) {
					iterationsUsed = i;

					float increment = float(i + 1);

					if(!doneN) {
							nDist += increment;
							posN = posM + offNP * nDist;
							vec4 rgbaEndN = FxaaTexTop(tex, posN.xy);
							doneN = contrast( rgbaEndN, rgbaM ) > contrast( rgbaEndN, rgbaN );
							iterationsUsedN = i;
					}

					if(!doneP) {
							pDist += increment;
							posP = posM - offNP * pDist;
							vec4 rgbaEndP = FxaaTexTop(tex, posP.xy);
							doneP = contrast( rgbaEndP, rgbaM ) > contrast( rgbaEndP, rgbaN );
							iterationsUsedP = i;
					}

					if(doneN || doneP) break;
			}


			if ( !doneP && !doneN ) return rgbaM; // failed to find end of edge

			float dist = min(
					doneN ? float( iterationsUsedN ) / float( NUM_SAMPLES - 1 ) : 1.,
					doneP ? float( iterationsUsedP ) / float( NUM_SAMPLES - 1 ) : 1.
			);

			// hacky way of reduces blurriness of mostly diagonal edges
			// but reduces AA quality
			dist = pow(dist, .5);

			dist = 1. - dist;

			return mix(
					rgbaM,
					rgbaN,
					dist * .5
			);
	}

	void main() {
			const float edgeDetectionQuality = .2;
			const float invEdgeDetectionQuality = 1. / edgeDetectionQuality;

			gl_FragColor = FxaaPixelShader(
					vUv,
					tDiffuse,
					resolution,
					edgeDetectionQuality, // [0,1] contrast needed, otherwise early discard
					invEdgeDetectionQuality
			);

	}
	`},b=Se.getInstance(),W=ye.getInstance(),S=new ge,P=j.initCamera(b),V=j.initRenderer(b),_e=j.initControl(P,V),O=new De(V);let k;const ae=new pe,ie=new Ae(Ue);ke();se();function ke(){P.position.set(0,1,4),b.onResize(function(){j.onResize(b,P,V),O.setSize(b.width,b.height),ie.uniforms.resolution.value.set(1/b.width,1/b.height)}),O.setSize(b.width,b.height),W.setOnChange(function(){ae.setFromCamera({x:W.x/b.width*2-1,y:1-W.y/b.height*2},P);const n=ae.intersectObject(S,!0);n.length>0?k.selectedObjects=[n[0].object]:k.selectedObjects=[]}),V.shadowMap.enabled=!0;const R=new me(16777215,.2);S.add(R);const e=new ve(16777215,.8);e.position.set(1,1,1),e.castShadow=!0,e.shadow.mapSize.set(1024,1024),S.add(e);const r=new I(new xe(5,5),new be({color:14548957,side:X}));r.rotation.x=-Math.PI/2,r.position.set(0,-.51,0),r.receiveShadow=!0,S.add(r),new Fe().load("models/tree.obj",function(n){n.position.set(0,-.5,0);const d=new L({color:14548957});n.traverse(function(o){o instanceof I&&(o.material=d,o.castShadow=!0)}),S.add(n)});const t=new L,i=new Me(.5,32,16),s=15;for(let n=0;n<s;n++){const d=U.randFloat(.2,.7);t.color.setHSL(Math.random(),1,.5);const o=new I(i,t.clone());o.scale.set(d,d,d),o.position.set(U.randFloat(-.9,.9),U.randFloat(-.2,.5),U.randFloat(-1.4,.9)),o.castShadow=!0,S.add(o)}const l=new I(new Te(.4,.15,16,80),new L({color:16755455}));l.position.set(1,0,-1),S.add(l);const u=new Be(S,P);O.addPass(u),k=new E(new T(b.width,b.height),S,P),O.addPass(k),O.addPass(ie)}function se(){O.render(),_e.update(),requestAnimationFrame(se)}
