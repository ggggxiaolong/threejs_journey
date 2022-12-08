import { Experience } from "../experience";
import { Environment } from "./environment";
import { Floor } from "./floor";
import { Fox } from "./fox";

export class World {
    constructor(){
        this.experience = new Experience()
        this.resource = this.experience.resource
        this.loaded = false
        this.resource.on("ready", ()=> {
            this.loaded = true
            this.env = new Environment()
            // this.testMesh = new TestMesh()
            this.floor = new Floor()
            this.fox = new Fox()
        });
    }

    update(){
        if(this.loaded){
            this.fox.update()
        }
    }
}