import * as cm from "../../src/index.js";
import { dispose } from "../dispose.js";
import { object, location, force } from "../force.js";
import { frame } from "../frame.js";
import { stats } from "../stats.js";

function updateBob(d, { dragging, anchor, spring }) {
  const applyGravity = (d) => cm.vec(0, 1).mult(d.mass);
  const applySpring = (d) => {
    const f = cm.vecSub(d.location, anchor.location);
    const length = f.mag();
    const stretch = length - spring.length;
    const m = -1 * spring.k * stretch;
    f.mag(m);
    return f;
  };
  const applyDamping = (d) => d.velocity.mult(0.98);
  const applyDrag = (d, i, _, flow) => {
    const app = flow.app();
    d.location.x = app.prop("mouseX") - app.prop("width") / 2;
    d.location.y = app.prop("mouseY");
    d.velocity.mult(0);
    d.acceleration.mult(0);
  };

  if (dragging) d.process(cm.each, applyDrag);
  else {
    d.process(cm.each, force(applyGravity))
      .process(cm.each, force(applySpring))
      .process(cm.each, applyDamping)
      .process(cm.each, location());
  }
}

function drawBob(d, { dragging }) {
  const x = (d) => d.location.x;
  const y = (d) => d.location.y;
  d.append(cm.link, { x: 0, y: 0, x1: x, y1: y });
  d.append(cm.circle, {
    x,
    y,
    r: 20,
    fill: dragging ? "black" : cm.rgb(175),
    stroke: cm.rgb(0),
  });
}

export function oscillationSpring2() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  let dragging = false;

  const spring = { k: 0.1, length: 100 };
  const bob = object({ location: cm.vec(0, spring.length) });
  const anchor = object();

  app
    .on("update", () => app.append(cm.background, { fill: cm.rgb(255) }))
    .on("update", () => {
      const group = app.append(cm.group, { x: app.prop("width") / 2, y: 0 });

      group
        .datum(bob)
        .call(updateBob, { dragging, spring, anchor })
        .call(drawBob, { dragging });

      group.datum(anchor).append(cm.rect, {
        x: (d) => d.location.x - 5,
        y: (d) => d.location.y,
        width: 10,
        height: 10,
        fill: cm.rgb(175),
        stroke: cm.rgb(0),
      });
    })
    .on("mousedown", () => (dragging = true))
    .on("mouseup", () => (dragging = false));

  return app.call(dispose).call(stats).call(frame).start();
}
