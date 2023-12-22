import { random } from "./random.js";

export function randomChar() {
  const seed = random(32, 127);
  return String.fromCharCode(seed);
}
