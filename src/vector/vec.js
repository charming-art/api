import { vec$add } from "./add.js";
import { vec$set, vec$setX, vec$setY } from "./set.js";
import { vec$sub } from "./sub.js";
import { vec$dist, vec$dist2 } from "./dist.js";
import { vec$mult } from "./mult.js";
import { vec$mag } from "./mag.js";
import { vec$div } from "./div.js";
import { vec$norm } from "./norm.js";
import { vec$clamp, vec$clampX, vec$clampY } from "./clamp.js";
import { vec$random } from "./random.js";
import { vec$dot } from "./dot.js";
import { vec$cross } from "./cross.js";
import { vec$neg, vec$negX, vec$negY } from "./neg.js";
import { vec$inX, vec$inY } from "./in.js";
import { vec$angle } from "./angle.js";
import { vec$clone } from "./clone.js";

export function Vec(x = 0, y = 0) {
  Object.defineProperties(this, {
    x: { value: x, writable: true },
    y: { value: y, writable: true },
  });
}

Object.defineProperties(Vec.prototype, {
  set: { value: vec$set },
  setX: { value: vec$setX },
  setY: { value: vec$setY },
  add: { value: vec$add },
  sub: { value: vec$sub },
  dist: { value: vec$dist },
  dist2: { value: vec$dist2 },
  mult: { value: vec$mult },
  div: { value: vec$div },
  mag: { value: vec$mag },
  norm: { value: vec$norm },
  clamp: { value: vec$clamp },
  clampX: { value: vec$clampX },
  clampY: { value: vec$clampY },
  random: { value: vec$random },
  dot: { value: vec$dot },
  cross: { value: vec$cross },
  random: { value: vec$random },
  neg: { value: vec$neg },
  negX: { value: vec$negX },
  negY: { value: vec$negY },
  inX: { value: vec$inX },
  inY: { value: vec$inY },
  angle: { value: vec$angle },
  clone: { value: vec$clone },
});

export function vec(...params) {
  return new Vec(...params);
}
