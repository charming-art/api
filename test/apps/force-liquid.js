import * as cm from "./_cm.js";
import { frame } from "./_frame.js";
import { force, location, collision, object } from "./_force.js";
import { dispose } from "./_dispose.js";
import { stats } from "./_stats.js";

export function forceLiquid() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const movers = cm.range(25, () =>
    object({
      location: cm.vec(cm.random(0, app.width()), 0),
      velocity: cm.vec(),
      acceleration: cm.vec(),
      mass: cm.random(1, 5),
    })
  );

  const liquid = {
    x: 0,
    y: app.height() / 2,
    width: app.width(),
    height: app.height() / 2,
    c: 0.1,
  };

  const applyGravity = force((d) => cm.vec(0, 0.1).mult(d.mass));
  const applyDrag = force((d) => {
    const { x, y, height, width, c } = liquid;
    if (!d.location.inX(x, x + width)) return;
    if (!d.location.inY(y, y + height)) return;
    const v = d.velocity.mag();
    const mag = c * v * v;
    return cm.vecNeg(d.velocity).mag(mag);
  });
  const update = location();
  const detect = collision();

  app
    .frame(() => app.append(cm.background, { fill: cm.rgb(255) }))
    .frame(() => app.append(cm.rect, { ...liquid, fill: cm.rgb(175) }))
    .frame(() => {
      app
        .data(movers)
        .each(applyGravity)
        .each(applyDrag)
        .each(update)
        .each(detect)
        .append(cm.circle, {
          x: (d) => d.location.x,
          y: (d) => d.location.y,
          fill: "rgba(175, 175, 175, 0.5)",
          stroke: cm.rgb(0),
          r: {
            scale: cm.scaleSqrt,
            value: (d) => d.mass,
            range: [2, 20],
          },
        });
    });

  return app.call(dispose).call(stats).call(frame).start();
}
