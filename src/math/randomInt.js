import { random } from "./random.js";

export function randomInt(min, max) {
  return Math.floor(random(min, max));
}
