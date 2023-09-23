import * as cm from "./_cm.js";
import { frame } from "./_frame.js";
import { dispose } from "./_dispose.js";

export function vectorFollowMe() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const movers = Array.from({ length: 20 }, () => ({
    location: cm.vec(cm.random(app.width()), cm.random(app.height())),
    velocity: cm.vec(),
    acceleration: cm.vec(),
    speed: 8,
  }));

  app
    .frame(() => app.shape(cm.background, { fill: cm.rgb(255) }))
    .frame(() => {
      app
        .data(movers)
        .each(({ location, velocity, acceleration, speed }) => {
          cm.vec(app.mouseX(), app.mouseY())
            .sub(location)
            .norm()
            .mult(0.5)
            .out(acceleration);

          location
            .add(velocity.add(acceleration).clamp(speed))
            .clampX(app.width())
            .clampY(app.height());
        })
        .shape(cm.circle, {
          x: (d) => d.location.x,
          y: (d) => d.location.y,
          fill: "rgba(175, 175, 175, 0.5)",
          stroke: cm.rgb(0),
          r: 16,
        });
    });

  return app.call(dispose).call(frame).start();
}
