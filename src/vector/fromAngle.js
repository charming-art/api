import { Vec } from "./vec";

export function vecFromAngle(angle) {
  return new Vec(Math.cos(angle), Math.sin(angle));
}
