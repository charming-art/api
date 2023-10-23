import * as cm from "./_cm.js";
import { dispose } from "./_dispose.js";
import { force, object, location } from "./_force.js";
import { frame } from "./_frame.js";
import { stats } from "./_stats.js";

function update(app, context) {
  const { target, a2 } = context;

  const update = location();

  const seek = force((d) => {
    const desired = cm.vecSub(target.location, a2.location).mag(d.maxSpeed);
    const steer = cm.vecSub(desired, d.velocity);
    steer.clamp(d.maxForce);
    return steer;
  });

  app.append(cm.background, { fill: cm.rgb(255) });

  app
    .datum(target)
    .process(cm.each, (d) =>
      d.location.set(app.prop("mouseX"), app.prop("mouseY"))
    )
    .append(cm.circle, {
      x: (d) => d.location.x,
      y: (d) => d.location.y,
      r: 24,
      stroke: "black",
      fill: cm.rgb(175),
      strokeWidth: 2,
    });

  app
    .datum(a2)
    .process(cm.each, seek)
    .process(cm.each, update)
    .append(cm.group, {
      x: (d) => d.location.x,
      y: (d) => d.location.y,
      rotate: (d) => d.velocity.angle(),
    })
    .append(cm.triangle, {
      x: (d) => d.r * 2,
      y: 0,
      x1: (d) => -d.r * 2,
      y1: (d) => -d.r,
      x2: (d) => -d.r * 2,
      y2: (d) => d.r,
      fill: cm.rgb(175),
      stroke: cm.rgb(0),
      strokeWidth: 2,
    });
}

export function a2Seeking() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const context = {
    target: object({
      location: cm.vec(app.prop("mouseX"), app.prop("mouseY")),
    }),
    a2: object({
      location: cm.vec(app.prop("width") / 2, app.prop("height") / 2),
      velocity: cm.vec(),
      acceleration: cm.vec(),
      maxSpeed: 8,
      maxForce: 0.2,
      r: 6,
    }),
  };

  return app
    .on("update", () => update(app, context))
    .call(dispose)
    .call(stats)
    .call(frame)
    .start();
}
