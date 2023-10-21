import * as cm from "./_cm.js";
import { dispose } from "./_dispose.js";
import { frame } from "./_frame.js";
import { stats } from "./_stats.js";

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
    rotate: {
      value: (d) => d.location.x,
      domain: [0, app.prop("width")],
      range: [0, cm.TWO_PI * 2],
    },
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
  };

  const particles = [];

  app
    .on("update", () => app.append(cm.background, { fill: cm.rgb(255) }))
    .on("update", () => {
      const flow = app
        .data(particles)
        .push({
          location: cm.vec(app.prop("width") / 2, 50),
          velocity: cm.vec(cm.random(-1, 1), cm.random(-2, 0)),
          acceleration: cm.vec(0, 0.05),
          lifespan: 255,
          type: Math.random() < 0.5 ? 1 : 0,
        })
        .eachRight((d, i, array) => d.lifespan < 0 && array.splice(i, 1))
        .each((d) => (d.lifespan -= 2))
        .each((d) => {
          d.velocity.add(d.acceleration);
          d.location.add(d.velocity);
        });

      flow
        .filter((d) => d.type === 1)
        .append(cm.circle, {
          ...options,
          r: 5,
        });

      flow
        .filter((d) => d.type === 0)
        .append(cm.rect, {
          ...options,
          width: 10,
          height: 10,
          anchor: "center",
        });
    });

  return app.call(dispose).call(frame).call(stats).start();
}
