import * as cm from "../../src/index.js";
import { frame } from "./_frame.js";
import { dispose } from "./_dispose.js";
import { stats } from "./_stats.js";

export function vectorFollowMe() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const movers = cm.range(20, () => ({
    location: cm.vec(
      cm.random(app.prop("width")),
      cm.random(app.prop("height"))
    ),
    velocity: cm.vec(),
    acceleration: cm.vec(),
    speed: 8,
  }));

  app
    .on("update", () => app.append(cm.background, { fill: cm.rgb(255) }))
    .on("update", () => {
      app
        .data(movers)
        .process(cm.each, ({ location, velocity, acceleration, speed }) => {
          cm.vec(app.prop("mouseX"), app.prop("mouseY"))
            .sub(location)
            .norm()
            .mult(0.5)
            .out(acceleration);

          location
            .add(velocity.add(acceleration).clamp(speed))
            .clampX(app.prop("width"))
            .clampY(app.prop("height"));
        })
        .append(cm.circle, {
          x: (d) => d.location.x,
          y: (d) => d.location.y,
          fill: "rgba(175, 175, 175, 0.5)",
          stroke: cm.rgb(0),
          r: 16,
        });
    });

  return app.call(dispose).call(stats).call(frame).start();
}
