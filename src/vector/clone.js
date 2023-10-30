import { Vec } from "./vec.js";

export function vec$clone() {
  return new Vec(this.x, this.y);
}
