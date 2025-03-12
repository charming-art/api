import * as cm from "../../src/index.js";

export function circle() {
  return cm.render({draw: [cm.svg("circle", {cx: 50, cy: 50, r: 50})]}).node();
}
