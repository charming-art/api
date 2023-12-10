import * as cm from "../../src/index.js";
import { dispose } from "../dispose.js";
import { frame } from "../frame.js";
import { stats } from "../stats.js";

export function particleClusterShapes() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const options = {
    x: (d) => d.location.x,
    y: (d) => d.location.y,
    fill: cm.rgb(0),
    stroke: cm.rgb(0),
    rotate: (d) => d.location.x,
    fillOpacity: (d) => d.lifespan,
    strokeOpacity: (d) => d.lifespan,
  };

  const scaleOptions = {
    fillOpacity: { domain: [0, 255], range: [0, 0.6] },
    strokeOpacity: { domain: [0, 255], range: [0, 1] },
    rotate: { domain: [0, app.prop("width")], range: [0, cm.TWO_PI * 2] },
  };

  const particles = [];

  app
    .on("update", () => app.append(cm.clear, { fill: cm.rgb(255) }))
    .on("update", () => {
      const flow = app
        .data(particles)
        .process(cm.push, {
          location: cm.vec(app.prop("width") / 2, 50),
          velocity: cm.vec(cm.random(-1, 1), cm.random(-2, 0)),
          acceleration: cm.vec(0, 0.05),
          lifespan: 255,
          type: Math.random() < 0.5 ? 1 : 0,
        })
        .process(cm.eachRight, (d, i, array) => d.lifespan < 0 && array.splice(i, 1))
        .process(cm.each, (d) => (d.lifespan -= 2))
        .process(cm.each, (d) => {
          d.velocity.add(d.acceleration);
          d.location.add(d.velocity);
        });

      flow
        .process(cm.filter, (d) => d.type === 1)
        .append(cm.circle, { ...options, r: 5 })
        .transform(cm.mapAttrs, scaleOptions);

      flow
        .process(cm.filter, (d) => d.type === 0)
        .append(cm.rect, {
          ...options,
          width: 10,
          height: 10,
          anchor: "center",
        })
        .transform(cm.mapAttrs, scaleOptions);
    });

  return app.call(dispose).call(frame).call(stats).start().node();
}
