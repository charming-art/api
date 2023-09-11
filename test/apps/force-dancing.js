import * as cm from "./_cm.js";
import { frame } from "./_frame.js";

function applyForce(d, i, data, app, force) {
  const a = cm.vecDiv(force, d.mass);
  d.acceleration.add(a);
}

function updateLocation(d) {
  d.velocity.add(d.acceleration);
  d.location.add(d.velocity);
  d.acceleration.mult(0);
}

function collisionX(d, i, data, app) {
  if (!d.location.inX(app.width())) {
    d.location.clampX(app.width());
    d.velocity.negX();
  }
}

function collisionY(d, i, data, app) {
  if (d.location.y > app.height()) {
    d.location.setY(app.height());
    d.velocity.negY();
  }
}

export function forceDancing() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const movers = Array.from({ length: 25 }, () => ({
    location: cm.vec(),
    velocity: cm.vec(),
    acceleration: cm.vec(),
    mass: cm.random(0.1, 5),
  }));

  const gravity = cm.vec(0, 0.2);
  const wind = cm.vec(0.02, 0);

  app
    .frame(() => app.shape(cm.background, { fill: cm.rgb(255) }))
    .frame(() => {
      app
        .data(movers)
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
            value: (d) => d.mass,
            range: [2, 20],
          },
        });
    });

  return app.call(frame).start();
}
