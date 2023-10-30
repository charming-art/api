import { Vec } from "./vec.js";

export function staticize(compute) {
  return function (...params) {
    const out = new Vec();
    compute(out, ...params);
    return out;
  };
}
