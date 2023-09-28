import * as cm from "./_cm.js";
import { frame } from "./_frame.js";
import { dispose } from "./_dispose.js";

export function vectorMoveLink() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  app.frame(() => {
    const center = cm.vec(app.width() / 2, app.height() / 2);
    const mouse = cm.vec(app.mouseX(), app.mouseY());
    const dir = cm.vecSub(mouse, center);
    app.append(cm.background, { fill: cm.rgb(255) });
    app.append(cm.link, {
      x: center.x,
      y: center.y,
      x1: center.x + dir.x,
      y1: center.y + dir.y,
    });
  });

  return app.call(dispose).call(frame).start();
}
