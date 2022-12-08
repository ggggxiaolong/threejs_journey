import EventEmitter from "./eventEmitter";

export class Time extends EventEmitter {
  constructor() {
    super();
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    const current = Date.now();
    this.elapsed = current - this.start;
    this.delta = current - this.current;
    this.current = current;
    this.trigger("tick");
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
