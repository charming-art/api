import * as cm from "./_cm.js";
import { dispose } from "./_dispose.js";
import { frame } from "./_frame.js";
import { stats } from "./_stats.js";

export function oscillationOscillateMultiple() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const oscillators = cm.range(20, () => ({
    angle: cm.vec(),
    velocity: cm.vec(cm.random(-0.05, 0.05), cm.random(-0.05, 0.05)),
    amplitude: cm.vec(
      cm.random(app.prop("width") / 2),
      cm.random(app.prop("height") / 2)
    ),
  }));

  app
    .on("update", () => app.append(cm.background, { fill: cm.rgb(255) }))
    .on("update", () => {
      const group = app.append(cm.group, {
        x: app.prop("width") / 2,
        y: app.prop("height") / 2,
      });
      const x = (d) => Math.sin(d.angle.x) * d.amplitude.x;
      const y = (d) => Math.sin(d.angle.y) * d.amplitude.y;
      group
        .data(oscillators)
        .process(cm.each, (d) => d.angle.add(d.velocity))
        .call((d) => d.append(cm.link, { x: 0, y: 0, x1: x, y1: y }))
        .call((d) =>
          d.append(cm.circle, {
            x,
            y,
            r: 16,
            stroke: "#000",
            fill: cm.rgb(175),
            fillOpacity: 0.5,
          })
        );
    });

  return app.call(dispose).call(stats).call(frame).start();
}
