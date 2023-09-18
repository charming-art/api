import * as cm from "./_cm.js";
import { frame } from "./_frame.js";
import { attraction, object, location } from "./_force.js";

export function forceAttract() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const centerX = app.width() / 2;
  const centerY = app.height() / 2;

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
    .frame(() => app.shape(cm.background, { fill: cm.rgb(255) }))
    .frame(() => {
      app
        .datum(mover)
        .each(applyAttraction)
        .each(update)
        .shape(cm.circle, {
          x: (d) => d.location.x,
          y: (d) => d.location.y,
          r: (d) => d.mass,
          fill: cm.rgb(175),
          stroke: "#000",
          strokeWidth: 2,
        });
    })
    .frame(() => {
      app
        .datum(attractor) // Convert to an array.
        .shape(cm.circle, {
          x: (d) => d.location.x,
          y: (d) => d.location.y,
          r: (d) => d.mass,
          fill: cm.rgb(175),
          stroke: "#000",
          strokeWidth: 5,
        });
    });

  return app.call(frame).start();
}
