import * as cm from "./_cm.js";
import { dispose } from "./_dispose.js";
import { object, location, force } from "./_force.js";
import { frame } from "./_frame.js";
import { stats } from "./_stats.js";

export function particleClusterForce() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const particles = [];
  const repeller = {
    location: cm.vec(app.prop("width") / 2, app.prop("height") - 50),
    power: 150,
  };

  const update = location();
  const fadeOut = (d, i, array) => {
    if (d.lifespan < 0) array.splice(i, 1);
    d.lifespan -= 2;
  };
  const applyGravity = force((d) => cm.vec(0, 0.1).mult(d.mass));
  const applyRepeller = force((d) => {
    const force = cm.vecSub(repeller.location, d.location);
    const distance = cm.clamp(force.mag(), 5, 50);
    const strength = (-1 * repeller.power) / (distance * distance);
    force.mag(strength);
    return force;
  });

  app
    .on("update", () => app.append(cm.background, { fill: cm.rgb(255) }))
    .on("update", () => {
      app.datum(repeller).append(cm.circle, {
        x: (d) => d.location.x,
        y: (d) => d.location.y,
        r: 16,
        stroke: "black",
        fill: cm.rgb(127),
      });

      app
        .data(particles)
        .push(
          object({
            location: cm.vec(app.prop("width") / 2, 50),
            lifespan: 255,
            velocity: cm.vec(cm.random(-1, 1), cm.random(-2, 0)),
          })
        )
        .eachRight(fadeOut)
        .each(applyRepeller)
        .each(applyGravity)
        .each(update)
        .append(cm.circle, {
          x: (d) => d.location.x,
          y: (d) => d.location.y,
          r: 5,
          fill: cm.rgb(0),
          stroke: cm.rgb(0),
          fillOpacity: {
            value: (d) => d.lifespan,
            domain: [0, 255],
            range: [0, 0.6],
          },
          strokeOpacity: {
            value: (d) => d.lifespan,
            domain: [0, 255],
            range: [0, 1],
          },
        });
    });

  return app.call(dispose).call(frame).call(stats).start();
}
