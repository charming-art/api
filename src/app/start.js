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
    this._timer = interval(() => tick.call(this), (1000 / this._frameRate) | 0);
    this._reschedule = false;
  }
}

function tick() {
  this._frameCount++;
  for (const [hook, ...params] of this._frame) hook(this, ...params);
  this.render();
  schedule.call(this); // Schedule at the end of every tick.
}

export function app$start() {
  if (!this._stop) tick.call(this);
  this._stop = false;
  return this.node();
}
