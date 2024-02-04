import * as cm from "../../src/index.js";
import { dispose } from "../utils/dispose.js";
import { force, object, location } from "../utils/force.js";
import { frame } from "../utils/frame.js";
import { stats } from "../utils/stats.js";

function update(app, context) {
  const { a2 } = context;

  const update = location();

  const constrainX = (d) => {
    const width = app.prop("width");
    if (d.location.x < 0) d.location.x += width;
    if (d.location.x > width) d.location.x -= width;
  };

  const constrainY = (d) => {
    const height = app.prop("height");
    if (d.location.y < 0) d.location.y += height;
    if (d.location.y > height) d.location.y -= height;
  };

  const seek = force((d) => {
    const desired = cm.vecSub(d.target, a2.location).mag(d.maxSpeed);
    const steer = cm.vecSub(desired, d.velocity);
    steer.clamp(d.maxForce);
    return steer;
  });

  const target = (d) => {
    const circle = d.velocity.clone();
    circle.mag(d.wanderD).add(d.location);
    const heading = d.velocity.angle();
    const theta = (d.wanderT += cm.random(-d.wanderC, d.wanderC)) + heading;
    const r = cm.vec(d.wanderR * Math.cos(theta), d.wanderR * Math.sin(theta));
    d.target = cm.vecAdd(circle, r);
    d.circle = circle;
  };

  app.append(cm.clear, { fill: cm.rgb(255) });

  const groups = app
    .datum(a2)
    .process(cm.each, target)
    .process(cm.each, seek)
    .process(cm.each, constrainX)
    .process(cm.each, constrainY)
    .process(cm.each, update);

  groups.append(cm.circle, {
    x: (d) => d.circle.x,
    y: (d) => d.circle.y,
    r: (d) => d.wanderR,
    fill: cm.rgb(255),
    stroke: cm.rgb(0),
  });

  groups.append(cm.link, {
    x: (d) => d.circle.x,
    y: (d) => d.circle.y,
    x1: (d) => d.location.x,
    y1: (d) => d.location.y,
  });

  groups.append(cm.circle, {
    x: (d) => d.target.x,
    y: (d) => d.target.y,
    r: 2,
    fill: cm.rgb(175),
    stroke: cm.rgb(0),
  });

  groups.append(cm.link, {
    x: (d) => d.circle.x,
    y: (d) => d.circle.y,
    x1: (d) => d.target.x,
    y1: (d) => d.target.y,
  });

  groups
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

export function a2Wandering() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const a2 = object({
    location: cm.vec(app.prop("width") / 2, app.prop("height") / 2),
    maxSpeed: 2,
    maxForce: 0.05,
    r: 6,
    wanderR: 25,
    wanderD: 80,
    wanderT: 0,
    wanderC: 0.3,
  });

  return app
    .on("update", () => update(app, { a2 }))
    .call(dispose)
    .call(stats)
    .call(frame)
    .start()
    .node();
}
