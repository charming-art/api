import * as cm from "./_cm.js";
import { frame } from "./_frame.js";
import { location, attraction, object } from "./_force.js";
import { dispose } from "./_dispose.js";
import { stats } from "./_stats.js";

export function forceEverything() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const movers = Array.from({ length: 20 }, () =>
    object({
      location: cm.vec(
        cm.random(app.prop("width")),
        cm.random(app.prop("height"))
      ),
      velocity: cm.vec(cm.random(-1, 1), cm.random(-1, 1)),
      acceleration: cm.vec(),
      mass: cm.random(2, 5),
      G: 0.4,
    })
  );

  const update = location();

  app
    .on("update", () => app.append(cm.background, { fill: cm.rgb(255) }))
    .on("update", () => {
      app
        .data(movers)
        .each((i) =>
          app
            .data(movers)
            .filter((j) => i !== j)
            .each((j) => attraction(j)(i))
        )
        .each(update)
        .append(cm.circle, {
          x: (d) => d.location.x,
          y: (d) => d.location.y,
          r: (d) => d.mass * 2,
          fill: cm.rgb(175),
          stroke: "#000",
          strokeWidth: 2,
        });
    });

  return app.call(dispose).call(stats).call(frame).start();
}
