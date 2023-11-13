import * as cm from "../../src/index.js";
import { dispose } from "../dispose.js";
import { frame } from "../frame.js";
import { stats } from "../stats.js";

export function oscillationDone() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  app
    .on("update", () => app.append(cm.clear, { fill: cm.rgb(255) }))
    .on("update", () => {
      const r = 75;
      const theta = app.prop("frameCount") / 50;
      const group = app.append(cm.group, {
        x: app.prop("width") / 2,
        y: app.prop("height") / 2,
      });
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      group.append(cm.link, { x: 0, y: 0, x1: x, y1: y });
      group.append(cm.circle, { x, y, r: 16 });
    });

  return app.call(dispose).call(stats).call(frame).start();
}
