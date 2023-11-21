import * as cm from "../../src/index.js";
import { dispose } from "../dispose.js";
import { frame } from "../frame.js";
import { stats } from "../stats.js";

export function particleCluster() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const particles = [];

  app
    .on("update", () => app.append(cm.clear, { fill: cm.rgb(255) }))
    .on("update", () => {
      app
        .data(particles)
        .process(cm.push, {
          location: cm.vec(app.prop("width") / 2, 50),
          velocity: cm.vec(cm.random(-1, 1), cm.random(-2, 0)),
          acceleration: cm.vec(0, 0.05),
          lifespan: 255,
        })
        .process(
          cm.eachRight,
          (d, i, array) => d.lifespan < 0 && array.splice(i, 1)
        )
        .process(cm.each, (d) => (d.lifespan -= 2))
        .process(cm.each, (d) => {
          d.velocity.add(d.acceleration);
          d.location.add(d.velocity);
        })
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
    });

  return app.call(dispose).call(frame).call(stats).start();
}
