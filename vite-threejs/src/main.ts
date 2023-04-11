import './style.css'

const params = new URLSearchParams(window.location.search);
const query = params.get("q");
export const NAMES: Map<string, string> = new Map([
    ["basic", "01-basic"],
    ["sport-light", "02-sport-light"],
    ["helper-gui", "03-helper-gui"],
    ["raycast", "04-raycast"],
    ["oimoPhysics", "05-oimoPhysics"],
    ["shadowmap-viewer", "06-shadowmap-viewer"],
    ["animation", "07-animation"],
    ["load-glb", "08-load-glb"],
    ["littlest-tokyo", "09-littlest-tokyo"],
    ["clipping", "10-clipping"],
    ["skybox", "12-skybox"],
    ["pdb", "15-pdb"],
    ["extrude", "16-extrude"],
    ["text", "17-text"],
    ["texture", "18-texture"],
    ["dynamic", "19-dynamic"],
    ["morgh", "20-morgh"],
    ["temple", "21-temple"],
    ["points", "22-points"],
    ["shaders", "23-shaders"],
    ["shader-simple", "24-shader-simple"],
    ["shader_points_raycaster", "25-shader_points_raycaster"],
    ["shader-filmPass-bloomPass", "26-shader-filmPass-bloomPass"],
    ["glitchPass", "27-glitchPass"],
    ["outlinepass-fxaashader", "28-outlinepass-fxaashader"],
    ["blender-demo1", "blender-demo1"],
    ["blender-demo2", "blender-demo2"],
    // ["blender-city", "blender-city"],
    // ["blender-demo2_ani", "blender-demo2_ani"],
    ["blender-class1", "blender-class1"],
    ["blender-cabin", "blender-cabin"],
    ["blender-clip", "blender-clip"],
])
// console.log(path);
if(query){
    const fileName = NAMES.get(query);
    if (fileName) {
        import(`./class/${fileName}.ts`);
    } else {
        import('./path');
    }
} else {
    import('./path');
}