import * as cm from "./charming.js";
import { frame } from "./_frame.js";

export function vectorMoveLink() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  app.frame(() => {
    const center = cm.vec(app.width() / 2, app.height() / 2);
    const mouse = cm.vec(app.mouseX(), app.mouseY());
    const dir = cm.vecSub(mouse, center);
    app.background(cm.rgb(255)).shape(cm.link, {
      x: center.x,
      y: center.y,
      x1: center.x + dir.x,
      y1: center.y + dir.y,
    });
  });

  return app.call(frame).start();
}
