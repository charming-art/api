import * as cm from "../../src/index.js";

export function canvasStrokeCircle() {
  const context = cm.context2d({width: 200, height: 200});
  context.strokeStyle = "teal";
  context.lineWidth = 3;
  cm.strokeCircle(context, 100, 100, 70);
  return context.canvas;
}
