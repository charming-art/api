import * as cm from "../../src/index.js";

export function canvasFillCircle() {
  const context = cm.context2d({width: 200, height: 200});
  context.fillStyle = "coral";
  cm.fillCircle(context, 100, 100, 60);
  return context.canvas;
}
