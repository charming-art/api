import * as cm from "../../src/index.js";

export function canvasFillEllipse() {
  const context = cm.context2d({width: 200, height: 200});
  context.fillStyle = "skyblue";
  cm.fillEllipse(context, 100, 100, 85, 50);
  return context.canvas;
}
