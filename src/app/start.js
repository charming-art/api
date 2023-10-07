import { interval, timerFlush } from "d3-timer";
import { useHook } from "./_hook";

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
    const delay = (1000 / this._frameRate) | 0;
    this._timer = interval(() => {
      timerFlush();
      tick.call(this);
    }, delay);
    this._reschedule = false;
  }
}

function tick() {
  this._frameCount++;
  useHook(this, "beforeEach");
  useHook(this, "frame");
  this.render();
  useHook(this, "afterEach");
  schedule.call(this); // Schedule at the end of every tick.
}

export function app$start() {
  useHook(this, "beforeAll");
  if (!this._stop) tick.call(this);
  this._stop = false;
  return this.node();
}
