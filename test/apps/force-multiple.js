import * as cm from "./_cm.js";
import { frame } from "./_frame.js";
import { location, object, attraction } from "./_force.js";
import { dispose } from "./_dispose.js";

export function forceMultiple() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const centerX = app.width() / 2;
  const centerY = app.height() / 2;

  const attractor = object({
    mass: 10,
    location: cm.vec(centerX, centerY),
    G: 1,
  });

  const movers = cm.range(20, () =>
    object({
      location: cm.vec(cm.random(app.width()), cm.random(app.height())),
      velocity: cm.vec(cm.random(), cm.random()),
      mass: cm.random(2, 5),
    })
  );

  const applyAttraction = attraction(attractor);
  const update = location();

  app
    .frame(() => app.append(cm.background, { fill: cm.rgb(255) }))
    .frame(() => {
      app
        .data(movers)
        .each(applyAttraction)
        .each(update)
        .append(cm.circle, {
          x: (d) => d.location.x,
          y: (d) => d.location.y,
          r: (d) => d.mass * 2,
          fill: cm.rgb(175),
          stroke: "#000",
          strokeWidth: 2,
        });
    })
    .frame(() => {
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

  return app.call(dispose).call(frame).start();
}
