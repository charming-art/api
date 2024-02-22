import * as cm from "../../src/index.js";
import { dispose } from "../utils/dispose.js";
import { interpolateViridis } from "d3-scale-chromatic";
import { frame } from "../utils/frame.js";
import { snapshot } from "../utils/snapshot.js";

function arrow(flow, { length, angle, x, y, rotate, ...options }) {
  const group = flow.append(cm.group, { x, y, rotate });
  const halfLengthPos = length.map((d) => d / 2);
  const halfLengthNeg = length.map((d) => -d / 2);
  const anglePos = angle.map((d) => d);
  const angleNeg = angle.map((d) => -d);

  group.append(cm.link, {
    x: halfLengthNeg,
    y: 0,
    x1: halfLengthPos,
    y1: 0,
    ...options,
  });

  group.append(cm.link, {
    x: 0,
    y: 0,
    x1: halfLengthPos,
    y1: 0,
    rotate: angleNeg,
    transformOrigin: "end",
    ...options,
  });

  group.append(cm.link, {
    x: 0,
    y: 0,
    x1: halfLengthPos,
    y1: 0,
    rotate: anglePos,
    transformOrigin: "end",
    ...options,
  });
}

export function _canvasArrowColor() {
  const width = 640,
    height = 240,
    size = 16,
    cols = width / size,
    rows = height / size,
    noise = cm.randomNoise(0, 1, { seed: 1 }),
    fields = cm.cross(cm.range(cols), cm.range(rows)).map(([x, y]) => ({ x, y, value: noise(y * 0.1, x * 0.1) }));

  const app = cm.app({ width, height });

  app
    .data(fields)
    .append(arrow, {
      x: (d) => d.x * size + size / 2,
      y: (d) => d.y * size + size / 2,
      angle: Math.PI / 6,
      rotate: (d) => d.value,
      stroke: (d) => d.value,
      length: (d) => d.value,
    })
    .transform(cm.mapAttrs, {
      rotate: { range: [0, cm.TWO_PI] },
      length: { range: [size * 0.3, size * 0.9] },
      stroke: { interpolate: interpolateViridis },
    });

  return app.call(dispose).call(frame).call(snapshot).render().node();
}
