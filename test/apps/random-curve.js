import * as cm from "./_cm.js";
import { frame } from "./_frame.js";
import { dispose } from "./_dispose.js";
import { stats } from "./_stats.js";

function bellCurve(mu = 0, sigma = 1) {
  const e = 2.71828183;
  const sq2pi = Math.sqrt(cm.TWO_PI);
  const sdsq = sigma * sigma;
  return (x) => {
    const xmsq = -1 * (x - mu) * (x - mu);
    return (1 / (sigma * sq2pi)) * Math.pow(e, xmsq / sdsq);
  };
}

export function randomCurve() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const X = cm.range(app.prop("width"), -3, 3);
  let sigma = 0.5;
  let step = 0.01;

  app.on("update", () => {
    const curve = bellCurve(0, sigma);

    app.append(cm.background, { fill: "#fff" });

    app
      .data(X)
      .append(cm.line, {
        x: (_, i) => i,
        y: (d) => curve(d),
        r: 1,
        stroke: "black",
        strokeWidth: 2,
      })
      .transform(cm.scale, {
        y: {
          domain: [0, 1],
          range: [app.prop("height") - 2, 2],
        },
      });

    sigma += step;
    if (sigma > 2 || sigma < 0.3) step *= -1;
  });

  return app.call(dispose).call(stats).call(frame).start();
}
