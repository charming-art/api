import { Vec } from "./vec.js";

export function vec$set(a, b) {
  if (a instanceof Vec) {
    this.x = a.x;
    this.y = a.y;
    return this;
  }
  this.x = a;
  this.y = b;
  return this;
}

export function vec$setX(x) {
  this.x = x;
  return this;
}

export function vec$setY(y) {
  this.y = y;
  return this;
}
