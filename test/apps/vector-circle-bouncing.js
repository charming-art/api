import * as cm from "../../src/index.js";
import { frame } from "../frame.js";
import { dispose } from "../dispose.js";
import { stats } from "../stats.js";

export function vectorCircleBouncing() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const location = cm.vec(app.prop("width") / 2, app.prop("height") / 2);
  const velocity = cm.vec(1, 2.3);

  app
    .on("update", () => {
      location.add(velocity);
      if (!location.inX(app.prop("width"))) velocity.negX();
      if (!location.inY(app.prop("height"))) velocity.negY();
    })
    .on("update", () => {
      app.append(cm.clear, { fill: cm.rgb(255) });
      app.append(cm.circle, {
        x: location.x,
        y: location.y,
        r: 16,
        stroke: cm.rgb(0),
        fill: cm.rgb(175),
      });
    });

  return app.call(dispose).call(stats).call(frame).start();
}
