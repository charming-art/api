import * as cm from "./_cm.js";
import { dispose } from "./_dispose.js";
import { force, object, location } from "./_force.js";
import { frame } from "./_frame.js";
import { stats } from "./_stats.js";

export function oscillationCar() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const mover = object();

  const update = location();
  const toMouse = (d, { app }) => {
    const mouse = cm.vec(app.mouseX(), app.mouseY());
    return mouse.sub(d.location).mag(0.5);
  };
  const constrain = (d) => {
    d.location.clampX(app.width()).clampY(app.height());
    d.velocity.clamp(4);
  };

  app
    .frame(() => app.append(cm.background, { fill: cm.rgb(255) }))
    .frame(() => {
      app
        .datum(mover)
        .each(force(toMouse))
        .each(update)
        .each(constrain)
        .append(cm.rect, {
          x: (d) => d.location.x,
          y: (d) => d.location.y,
          width: 30,
          height: 10,
          fill: cm.rgb(175),
          stroke: cm.rgb(0),
          rotate: (d) => d.velocity.angle(),
        });
    });

  return app.call(dispose).call(stats).call(frame).start();
}
