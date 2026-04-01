import * as cm from "../../src/index.js";

export function canvasStrokeEllipse() {
  const context = cm.context2d({width: 200, height: 200});
  context.strokeStyle = "purple";
  context.lineWidth = 2;
  cm.strokeEllipse(context, 100, 100, 80, 45);
  return context.canvas;
}
