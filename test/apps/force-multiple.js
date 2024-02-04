import * as cm from "../../src/index.js";
import { frame } from "../utils/frame.js";
import { location, object, attraction } from "../utils/force.js";
import { dispose } from "../utils/dispose.js";
import { stats } from "../utils/stats.js";

export function forceMultiple() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const centerX = app.prop("width") / 2;
  const centerY = app.prop("height") / 2;

  const attractor = object({
    mass: 10,
    location: cm.vec(centerX, centerY),
    G: 1,
  });

  const movers = cm.range(20).map(() =>
    object({
      location: cm.vec(cm.random(app.prop("width")), cm.random(app.prop("height"))),
      velocity: cm.vec(cm.random(), cm.random()),
      mass: cm.random(2, 5),
    }),
  );

  const applyAttraction = attraction(attractor);
  const update = location();

  app
    .on("update", () => app.append(cm.clear, { fill: cm.rgb(255) }))
    .on("update", () => {
      app
        .data(movers)
        .process(cm.each, applyAttraction)
        .process(cm.each, update)
        .append(cm.circle, {
          x: (d) => d.location.x,
          y: (d) => d.location.y,
          r: (d) => d.mass * 2,
          fill: cm.rgb(175),
          stroke: "#000",
          strokeWidth: 2,
        });
    })
    .on("update", () => {
      app
        .datum(attractor) // Convert to an array.
        .append(cm.circle, {
          x: (d) => d.location.x,
          y: (d) => d.location.y,
          r: (d) => d.mass * 2,
          fill: cm.rgb(175),
          stroke: "#000",
          strokeWidth: 5,
        });
    });

  return app.call(dispose).call(stats).call(frame).start().node();
}
