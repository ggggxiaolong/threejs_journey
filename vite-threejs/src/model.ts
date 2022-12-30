export class Size {
    width: number;
    height: number;
    pixelRatio:number;
    aspect: number;
    constructor(){
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = Math.min(2, window.devicePixelRatio);
        this.aspect = this.width/this.height;
    }
    onResize(){
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = Math.min(2, window.devicePixelRatio);
        this.aspect = this.width/this.height;
    }
}