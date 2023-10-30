import * as cm from "../../src/index.js";
import { dispose } from "./_dispose.js";
import { force, location, object } from "./_force.js";
import { frame } from "./_frame.js";
import { stats } from "./_stats.js";

export function a2FlowNoise() {
  const app = cm.app({
    width: 640,
    height: 240,
  });

  const resolution = 20;
  const cols = Math.floor(app.prop("width") / resolution);
  const rows = Math.floor(app.prop("height") / resolution);
  const fields = cm.range(cols * rows);

  const cellWidth = app.prop("width") / cols;
  const cellHeight = app.prop("height") / rows;
  const x = (i) => (i % cols) * cellWidth + cellWidth / 2;
  const y = (i) => ((i / cols) | 0) * cellHeight + cellHeight / 2;

  const vertices = cm.range(120).map(() =>
    object({
      location: cm.vec(
        cm.random(app.prop("width")),
        cm.random(app.prop("height"))
      ),
      velocity: cm.vec(),
      r: 4,
      maxSpeed: cm.random(2, 5),
      maxForce: cm.random(0.1, 0.5),
    })
  );

  const initFields = () => {
    const noise = cm.randomNoise(4, cm.random(10000));
    const scale = cm.scaleLinear([0, 1], [0, cm.TWO_PI]);
    for (let m = 0; m < fields.length; m++) {
      const i = m % cols;
      const j = (m / cols) | 0;
      fields[m] = scale(noise(j * 0.1, i * 0.1));
    }
  };

  const lookup = (x, y) => {
    const i = cm.clamp((x / cellWidth) | 0, 0, cols - 1);
    const j = cm.clamp((y / cellHeight) | 0, 0, rows - 1);
    const angle = fields[j * cols + i];
    return cm.vecFromAngle(angle);
  };

  const updateLocation = location();

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

  const applyAuto = force((d) => {
    const desired = lookup(d.location.x, d.location.y);
    desired.mag(d.maxSpeed); // !!!Important
    const steer = cm.vecSub(desired, d.velocity);
    steer.clamp(d.maxForce); // !!!Important
    return steer;
  });

  initFields();

  function update() {
    app.append(cm.background, { fill: "white" });

    app
      .data(fields)
      .append(cm.group, {
        x: (_, i) => x(i),
        y: (_, i) => y(i),
        rotate: (d) => d,
      })
      .append(cm.link, {
        x: (-cellWidth / 2) * 0.5,
        y: 0,
        x1: (cellWidth / 2) * 0.5,
        y1: 0,
      });

    app
      .data(vertices)
      .process(cm.each, applyAuto)
      .process(cm.each, updateLocation)
      .process(cm.each, constrainX)
      .process(cm.each, constrainY)
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

  function mouseclick() {
    initFields();
  }

  return app
    .on("update", update)
    .on("mouseclick", mouseclick)
    .call(dispose)
    .call(frame)
    .call(stats)
    .start();
}
