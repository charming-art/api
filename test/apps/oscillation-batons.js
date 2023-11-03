import * as cm from "../../src/index.js";
import { dispose } from "../dispose.js";
import { frame } from "../frame.js";
import { stats } from "../stats.js";

export function oscillationBatons() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  app
    .on("update", () => app.append(cm.background, { fill: cm.rgb(255) }))
    .on("update", () => {
      app
        .data([0, 1, 2])
        .append(cm.group, {
          x: (_, i) => ((i + 0.5) * app.prop("width")) / 3,
          y: app.prop("height") / 2,
          rotate: (_, i) => app.prop("frameCount") / 50 + i * 30,
        })
        .call((d) => d.append(cm.link, { x: -80, y: 0, x1: 80, y1: 0 }))
        .call((d) => d.append(cm.circle, { x: -80, y: 0, r: 5 }))
        .call((d) => d.append(cm.circle, { x: 80, y: 0, r: 5 }));
    });

  return app.call(dispose).call(stats).call(frame).start();
}
