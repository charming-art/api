import * as cm from "./_cm.js";
import { dispose } from "./_dispose.js";
import { frame } from "./_frame.js";

export function oscillationOscillateMultiple() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const oscillators = cm.range(20, () => ({
    angle: cm.vec(),
    velocity: cm.vec(cm.random(-0.05, 0.05), cm.random(-0.05, 0.05)),
    amplitude: cm.vec(cm.random(app.width() / 2), cm.random(app.height() / 2)),
  }));

  app
    .frame(() => app.shape(cm.background, { fill: cm.rgb(255) }))
    .frame(() => {
      const group = app.shape(cm.group, {
        x: app.width() / 2,
        y: app.height() / 2,
      });
      const x = (d) => Math.sin(d.angle.x) * d.amplitude.x;
      const y = (d) => Math.sin(d.angle.y) * d.amplitude.y;
      group
        .data(oscillators)
        .each((d) => d.angle.add(d.velocity))
        .call((d) => d.shape(cm.link, { x: 0, y: 0, x1: x, y1: y }))
        .call((d) =>
          d.shape(cm.circle, {
            x,
            y,
            r: 16,
            stroke: "#000",
            fill: cm.rgb(175),
          })
        );
    });

  return app.call(dispose).call(frame).start();
}
