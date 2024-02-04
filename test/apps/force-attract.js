import * as cm from "../../src/index.js";
import { frame } from "../utils/frame.js";
import { attraction, object, location } from "../utils/force.js";
import { dispose } from "../utils/dispose.js";
import { stats } from "../utils/stats.js";

export function forceAttract() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const centerX = app.prop("width") / 2;
  const centerY = app.prop("height") / 2;

  const attractor = object({
    mass: 20,
    G: 1,
    location: cm.vec(centerX, centerY),
  });

  const mover = object({
    location: cm.vec(centerX, centerY - 50),
    velocity: cm.vec(1, 0),
    acceleration: cm.vec(),
    mass: 5,
  });

  const update = location();
  const applyAttraction = attraction(attractor);

  app
    .on("update", () => app.append(cm.clear, { fill: cm.rgb(255) }))
    .on("update", () => {
      app
        .datum(mover)
        .process(cm.each, applyAttraction)
        .process(cm.each, update)
        .append(cm.circle, {
          x: (d) => d.location.x,
          y: (d) => d.location.y,
          r: (d) => d.mass,
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
          r: (d) => d.mass,
          fill: cm.rgb(175),
          stroke: "#000",
          strokeWidth: 5,
        });
    });

  return app.call(dispose).call(stats).call(frame).start().node();
}
