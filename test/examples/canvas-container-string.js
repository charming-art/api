import * as cm from "../../src/index.js";

export function canvasContainerString() {
  const div = document.createElement("div");
  div.id = "cell3";
  setTimeout(() => {
    const context = cm.context2d({width: 200, height: 200, container: "#cell3"});
    context.fillStyle = "blue";
    context.fillRect(0, 0, 100, 100);
  }, 0);
  return div;
}
