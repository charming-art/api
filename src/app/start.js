import { interval } from "d3-timer";

function schedule() {
  // Need to stop?
  if (this._stop) {
    this._timer.stop();
    this._timer = null;
    this._reschedule = true;
    this._stop = false;
    return;
  }

  // Need to change frameRate?
  if (this._reschedule) {
    if (this._timer) this._timer.stop();
    const delay = (1000 / this._props.frameRate) | 0;
    this._timer = interval(() => {
      tick.call(this);
    }, delay);
    this._reschedule = false;
  }
}

function tick() {
  const emitter = this._emitter;
  emitter.emit("beforeEach", this);
  emitter.emit("update", this);
  this.render();
  this._props.frameCount++;
  emitter.emit("afterEach", this);
  schedule.call(this); // Schedule at the end of every tick.
}

export function app$start() {
  this._emitter.emit("beforeAll");
  if (!this._stop) tick.call(this);
  this._stop = false;
  return this;
}
