import { memberize } from "./_memberize.js";
import { staticize } from "./_staticize.js";

function _random(out) {
  out.x = Math.random();
  out.y = Math.random();
}

export const vec$random = memberize(_random);

export const vecRandom = staticize(_random);
