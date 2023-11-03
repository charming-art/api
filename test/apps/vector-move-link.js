import * as cm from "../../src/index.js";
import { frame } from "../frame.js";
import { dispose } from "../dispose.js";
import { stats } from "../stats.js";

export function vectorMoveLink() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  app.on("update", () => {
    const center = cm.vec(app.prop("width") / 2, app.prop("height") / 2);
    const mouse = cm.vec(app.prop("mouseX"), app.prop("mouseY"));
    const dir = cm.vecSub(mouse, center);
    app.append(cm.background, { fill: cm.rgb(255) });
    app.append(cm.link, {
      x: center.x,
      y: center.y,
      x1: center.x + dir.x,
      y1: center.y + dir.y,
    });
  });

  return app.call(dispose).call(stats).call(frame).start();
}
