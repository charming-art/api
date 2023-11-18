import { parseFont } from "figlet";

export function define(name, font) {
  let parsed = false;
  return function () {
    if (!parsed) parseFont(name, font), (parsed = true);
    return name;
  };
}
