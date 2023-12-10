import * as cm from "../../src/index.js";
import { frame } from "../frame.js";
import { dispose } from "../dispose.js";
import { stats } from "../stats.js";

export function randomDistribution() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const N = cm.range(15).map(() => 0);
  const step = app.prop("width") / N.length;

  app.on("update", () => {
    const index = cm.random(N.length) | 0;
    N[index] += 1;

    app.data(N).append(cm.rect, {
      x: (_, i) => i * step,
      y: (d) => app.prop("height") - d,
      width: step - 2,
      height: (d) => d,
      fill: cm.rgb(127),
      stroke: "black",
    });
  });

  return app.call(dispose).call(stats).call(frame).start().node();
}
