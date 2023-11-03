import { memberize } from "./memberize.js";
import { staticize } from "./staticize.js";

function random(out) {
  out.x = Math.random();
  out.y = Math.random();
}

export const vec$random = memberize(random);

export const vecRandom = staticize(random);
