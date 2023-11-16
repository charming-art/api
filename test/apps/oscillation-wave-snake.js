import * as cm from "../../src/index.js";
import { dispose } from "../dispose.js";
import { frame } from "../frame.js";
import { stats } from "../stats.js";

export function oscillationWaveSnake() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const I = cm.range(50);
  const X = cm.range(I.length, cm.TWO_PI);
  const X1 = cm.range(I.length, cm.TWO_PI * 2);
  const X2 = cm.range(I.length, cm.TWO_PI / 3);

  app
    .on("update", () => app.append(cm.clear, { fill: cm.rgb(255) }))
    .on("update", () => {
      app
        .data(I)
        .append(cm.circle, {
          x: (d) => d,
          y: (d) => {
            const offset = app.prop("frameCount") / 120;
            const x = Math.sin(X[d] + offset) * 2;
            const x1 = Math.sin(X1[d] + offset) * 1;
            const x2 = Math.sin(X2[d] + offset) * 3;
            return x * x1 * x2;
          },
          r: 20,
          fill: "rgba(175, 175, 175, 0.5)",
          stroke: "#000",
          strokeWidth: 1,
        })
        .transform(cm.mapProps, {
          x: { range: [0, app.prop("width")] },
          y: { range: [0, app.prop("height")] },
        });
    });

  return app.call(dispose).call(stats).call(frame).start();
}
