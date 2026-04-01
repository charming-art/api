import * as cm from "../../src/index.js";

export function canvasContainer() {
  const div = document.createElement("div");
  const context = cm.context2d({width: 200, height: 200, container: div});
  context.fillStyle = "green";
  context.fillRect(0, 0, 100, 100);
  return div;
}