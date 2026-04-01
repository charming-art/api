import * as cm from "../../src/index.js";

export function canvasContext2d() {
  const context = cm.context2d({width: 100, height: 100});
  context.fillRect(0, 0, 100, 100);
  context.fillStyle = "white";
  context.beginPath();
  context.arc(50, 50, 25, 0, Math.PI * 2);
  context.fill();
  return context.canvas;
}
