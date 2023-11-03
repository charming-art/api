import * as cm from "../../src/index.js";
import { dispose } from "../dispose.js";
import { force, object, location } from "../force.js";
import { frame } from "../frame.js";
import { stats } from "../stats.js";

export function oscillationCar() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const mover = object();

  const update = location();
  const toMouse = (d, i, _, flow) => {
    const app = flow.app();
    const mouse = cm.vec(app.prop("mouseX"), app.prop("mouseY"));
    return mouse.sub(d.location).mag(0.5);
  };
  const constrain = (d) => {
    d.location.clampX(app.prop("width")).clampY(app.prop("height"));
    d.velocity.clamp(4);
  };

  app
    .on("update", () => app.append(cm.background, { fill: cm.rgb(255) }))
    .on("update", () => {
      app
        .datum(mover)
        .process(cm.each, force(toMouse))
        .process(cm.each, update)
        .process(cm.each, constrain)
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
