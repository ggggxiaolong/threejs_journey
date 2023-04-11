export class Size {
  width: number;
  height: number;
  pixelRatio: number;
  aspect: number;
  private onChange: () => void;
  private static _instance: Size;

  private constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(2, window.devicePixelRatio);
    this.aspect = this.width / this.height;
    this.onChange = function () {};
    Size._instance = this;
    window.addEventListener("resize", function () {
      Size._instance.changeSize();
      Size._instance.onChange();
    });
  }

  public static getInstance(): Size {
    return Size._instance || (this._instance = new this());
  }

  private changeSize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(2, window.devicePixelRatio);
    this.aspect = this.width / this.height;
  }
  public onResize(onChange: () => void) {
    this.onChange = onChange;
  }
}

export class Mouse {
  x: number;
  y: number;
  offsetX: number = 0;
  offsetY: number = 0;
  private onChange: () => void;
  private static _instance: Mouse;

  private constructor(){
    this.x = 0;
    this.y = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.onChange = function(){}
    Mouse._instance = this;
    window.addEventListener("pointermove", function(event){
      Mouse._instance.onMove(event);
      Mouse._instance.onChange();
    })
  }

  public static getInstance(): Mouse {
    return Mouse._instance || (this._instance = new this());
  }

  public setOnChange(onChange: () => void) {
    this.onChange = onChange;
  }

  public updateOffset(offsetX: number, offsetY: number){
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

  private onMove(event: PointerEvent){
    // console.log(event);
    if ( event.isPrimary === false ) return;
    this.x = event.clientX - this.offsetX;
    this.y = event.clientY - this.offsetY;
  }
}