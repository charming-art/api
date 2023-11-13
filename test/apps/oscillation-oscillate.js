import * as cm from "../../src/index.js";
import { dispose } from "../dispose.js";
import { frame } from "../frame.js";
import { stats } from "../stats.js";

export function oscillationOscillate() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  app
    .on("update", () => app.append(cm.clear, { fill: cm.rgb(255) }))
    .on("update", () => {
      const amplitude = 100;
      const period = 120;
      const group = app.append(cm.group, {
        x: app.prop("width") / 2,
        y: app.prop("height") / 2,
      });
      const x =
        amplitude * Math.cos((cm.TWO_PI * app.prop("frameCount")) / period);
      const y = 0;
      group.append(cm.link, { x: 0, y: 0, x1: x, y1: y });
      group.append(cm.circle, { x, y, r: 16, fill: "black" });
    });

  return app.call(dispose).call(stats).call(frame).start();
}
