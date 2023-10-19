import * as cm from "./_cm.js";
import { dispose } from "./_dispose.js";
import { frame } from "./_frame.js";
import { stats } from "./_stats.js";

function updateParticles(flow) {
  flow
    .push(() => ({
      location: cm.vec(0, 0),
      velocity: cm.vec(cm.random(-1, 1), cm.random(-2, 0)),
      acceleration: cm.vec(0, 0.05),
      lifespan: 255,
    }))
    .eachRight((d, i, array) => d.lifespan < 0 && array.splice(i, 1))
    .each((d) => (d.lifespan -= 2))
    .each((d) => {
      d.velocity.add(d.acceleration);
      d.location.add(d.velocity);
    });
}

function drawParticles(flow) {
  flow.append(cm.circle, {
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
}

export function particleClusters() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const PS = [];

  app
    .frame(() => app.append(cm.background, { fill: cm.rgb(255) }))
    .frame(() => {
      const groups = app.data(PS).append(cm.group, {
        x: (d) => d.origin.x,
        y: (d) => d.origin.y,
      });

      groups
        .data((d) => d.particles)
        .call(updateParticles)
        .call(drawParticles);
    })
    .mousedown(() => {
      PS.push({
        origin: cm.vec(app.mouseX(), app.mouseY()),
        particles: [],
      });
    });

  return app.call(dispose).call(frame).call(stats).start();
}
