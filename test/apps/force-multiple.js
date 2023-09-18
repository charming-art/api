import * as cm from "./_cm.js";
import { frame } from "./_frame.js";
import { applyForce, updateLocation, attraction } from "./_force.js";

export function forceMultiple() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const centerX = app.width() / 2;
  const centerY = app.height() / 2;

  const attractor = {
    mass: 10,
    G: 1,
    location: cm.vec(centerX, centerY),
  };

  const movers = Array.from({ length: 20 }, () => ({
    location: cm.vec(cm.random(app.width()), cm.random(app.height())),
    velocity: cm.vec(cm.random(), cm.random()),
    acceleration: cm.vec(),
    mass: cm.random(2, 5),
  }));

  app
    .frame(() => app.shape(cm.background, { fill: cm.rgb(255) }))
    .frame(() => {
      app
        .data(movers)
        .each(applyForce, attraction, attractor)
        .each(updateLocation)
        .shape(cm.circle, {
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
        .shape(cm.circle, {
          x: (d) => d.location.x,
          y: (d) => d.location.y,
          r: (d) => d.mass * 2,
          fill: cm.rgb(175),
          stroke: "#000",
          strokeWidth: 5,
        });
    });

  return app.call(frame).start();
}
