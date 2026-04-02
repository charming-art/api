import * as cm from "../../src/index.js";

export function canvasDpr() {
  const context = cm.context2d({width: 200, height: 200, dpr: 1});
  context.fillRect(0, 0, 100, 100);
  context.fillStyle = "white";
  context.beginPath();
  context.arc(50, 50, 25, 0, Math.PI * 2);
  context.fill();
  return context.canvas;
}
