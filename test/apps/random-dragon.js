import * as cm from "../../src/index.js";
import { dispose } from "../dispose.js";
import { stats } from "../stats.js";

export function randomDragon() {
  const width = 640,
    height = 640,
    x = cm.randomNoise(0, width),
    y = cm.randomNoise(0, height),
    size = cm.randomNoise(0, 100),
    rotate = cm.randomNoise(0, cm.TWO_PI),
    hue = cm.randomNoise(0, 360);

  function setup(app) {
    app.append(cm.clear, { fill: "orange" });
  }

  function update(app) {
    const t = app.prop("frameCount") / 100;
    app
      .append(cm.group, {
        rotate: rotate(t),
        x: x(t),
        y: y(t),
      })
      .append(cm.rect, {
        x: 0,
        y: 0,
        width: size(t),
        height: size(t),
        fill: cm.hsl(hue(t), 100, 50),
        stroke: "black",
        fillOpacity: 0.5,
      });
  }

  return cm
    .app({ width: 640, height: 640 })
    .on("beforeAll", setup)
    .on("update", update)
    .call(dispose)
    .call(stats)
    .start()
    .node();
}
