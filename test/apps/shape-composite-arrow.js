import * as cm from "../../src/index.js";
import { dispose } from "../dispose.js";
import { frame } from "../frame.js";

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

function arrowRed(flow, options) {
  flow.append(arrow, { ...options, stroke: "red" });
}

export function shapeCompositeArrow() {
  const width = 640,
    height = 240,
    size = 16,
    cols = width / size,
    rows = height / size,
    noise = cm.randomNoise(),
    fields = cm.cross(cm.range(cols), cm.range(rows)).map(([x, y]) => ({ x, y, value: noise(y * 0.1, x * 0.1) }));

  const app = cm.app({ width, height });

  app
    .data(fields)
    .append(arrow, {
      x: (d) => d.x * size + size / 2,
      y: (d) => d.y * size + size / 2,
      length: size * 0.8,
      angle: Math.PI / 6,
      rotate: (d) => d.value,
    })
    .transform(cm.mapAttrs, {
      rotate: {
        domain: [0, 1],
        range: [0, cm.TWO_PI],
      },
    })
    .append(cm.circle, {
      x: 0,
      y: 0,
      fill: "blue",
      r: 2,
    });

  app
    .data(fields)
    .process(cm.filter, (d) => d.value > 0.01)
    .append(arrowRed, {
      x: (d) => d.x * size + size / 2,
      y: (d) => d.y * size + size / 2,
      length: size * 0.8,
      angle: Math.PI / 6,
      rotate: (d) => d.value,
    })
    .transform(cm.mapAttrs, {
      rotate: {
        domain: [0, 1],
        range: [0, cm.TWO_PI],
      },
    });

  return app.call(dispose).call(frame).render().node();
}
