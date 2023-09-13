import * as cm from "./_cm.js";
import { frame } from "./_frame.js";
import {
  applyForce,
  updateLocation,
  collisionX,
  collisionY,
} from "./_force.js";

export function forceFalling() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const movers = Array.from({ length: 25 }, () => ({
    location: cm.vec(cm.random(0, app.width()), 0),
    velocity: cm.vec(),
    acceleration: cm.vec(),
    mass: cm.random(1, 5),
  }));

  const gravity = (d) => cm.vec(0, 0.1).mult(d.mass);
  const friction = (d) => cm.vecNeg(d.velocity).mag(0.05);
  const wind = cm.vec(0.001, 0);

  app
    .frame(() => app.shape(cm.background, { fill: cm.rgb(255) }))
    .frame(() => {
      app
        .data(movers)
        .each(applyForce, friction)
        .each(applyForce, gravity)
        .each(applyForce, wind)
        .each(updateLocation)
        .each(collisionX)
        .each(collisionY)
        .shape(cm.circle, {
          x: (d) => d.location.x,
          y: (d) => d.location.y,
          fill: "rgba(175, 175, 175, 0.5)",
          stroke: cm.rgb(0),
          r: {
            scale: cm.scaleSqrt,
            value: (d) => d.mass,
            range: [2, 20],
          },
        });
    });

  return app.call(frame).start();
}
