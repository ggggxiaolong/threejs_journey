import * as dat from "dat.gui";
export class Debug{
    constructor(){
        this.enable = window.location.hash === "#debug"
        if(this.enable){
            this.ui = new dat.GUI()
        }
    }
}