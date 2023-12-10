import * as cm from "../../src/index.js";
import { dispose } from "../dispose.js";
import { frame } from "../frame.js";
import { stats } from "../stats.js";

function updateParticles(flow) {
  flow
    .process(cm.push, () => ({
      location: cm.vec(0, 0),
      velocity: cm.vec(cm.random(-1, 1), cm.random(-2, 0)),
      acceleration: cm.vec(0, 0.05),
      lifespan: 255,
    }))
    .process(cm.eachRight, (d, i, array) => d.lifespan < 0 && array.splice(i, 1))
    .process(cm.each, (d) => (d.lifespan -= 2))
    .process(cm.each, (d) => {
      d.velocity.add(d.acceleration);
      d.location.add(d.velocity);
    });
}

function drawParticles(flow) {
  flow
    .append(cm.circle, {
      x: (d) => d.location.x,
      y: (d) => d.location.y,
      r: 5,
      fill: cm.rgb(0),
      stroke: cm.rgb(0),
      fillOpacity: (d) => d.lifespan,
      strokeOpacity: (d) => d.lifespan,
    })
    .transform(cm.mapAttrs, {
      fillOpacity: { domain: [0, 255], range: [0, 0.6] },
      strokeOpacity: { domain: [0, 255], range: [0, 1] },
    });
}

export function particleClusters() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const PS = [];

  app
    .on("update", () => app.append(cm.clear, { fill: cm.rgb(255) }))
    .on("update", () => {
      const groups = app.data(PS).append(cm.group, {
        x: (d) => d.origin.x,
        y: (d) => d.origin.y,
      });

      groups
        .data((d) => d.particles)
        .call(updateParticles)
        .call(drawParticles);
    })
    .on("mouseDown", () => {
      PS.push({
        origin: cm.vec(app.prop("mouseX"), app.prop("mouseY")),
        particles: [],
      });
    });

  return app.call(dispose).call(frame).call(stats).start().node();
}
