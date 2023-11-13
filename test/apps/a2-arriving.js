import * as cm from "../../src/index.js";
import { dispose } from "../dispose.js";
import { force, object, location } from "../force.js";
import { frame } from "../frame.js";
import { stats } from "../stats.js";

function update(app, context) {
  const { target, a2 } = context;

  const update = location();

  const arrive = force((d) => {
    const desired = cm.vecSub(target.location, a2.location);

    // The closer, the slower.
    const distance = desired.mag();
    const scale = cm.scaleLinear([0, 100], [0, d.maxSpeed]);
    if (distance > 100) desired.mag(d.maxSpeed);
    else desired.mag(scale(distance));

    const steer = cm.vecSub(desired, d.velocity);
    steer.clamp(d.maxForce);
    return steer;
  });

  app.append(cm.clear, { fill: cm.rgb(255) });

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
    .process(cm.each, arrive)
    .process(cm.each, update)
    .append(cm.triangle, {
      translateX: (d) => d.location.x,
      translateY: (d) => d.location.y,
      rotate: (d) => d.velocity.angle(),
      x: (d) => d.r * 2,
      y: 0,
      x1: (d) => -d.r * 2,
      y1: (d) => -d.r,
      x2: (d) => -d.r * 2,
      y2: (d) => d.r,
      fill: cm.rgb(175),
      stroke: cm.rgb(0),
      strokeWidth: 2,
    })
    .append(cm.circle, {
      x: 0,
      y: 0,
      r: 5,
      fill: "red",
    });
}

export function a2Arriving() {
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
      maxSpeed: 4,
      maxForce: 0.1,
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
