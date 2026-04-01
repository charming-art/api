import * as cm from "../../src/index.js";

export function canvasStrokeLine() {
  const context = cm.context2d({width: 200, height: 200});
  context.strokeStyle = "#111";
  context.lineWidth = 2;
  cm.strokeLine(context, 20, 20, 180, 180);
  return context.canvas;
}
