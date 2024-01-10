import * as cm from "../../src/index.js";
import { dispose } from "../dispose.js";
import { stats } from "../stats.js";

export function randomDragon() {
  let width = 640,
    height = 640,
    offsetX = cm.random(10),
    offsetY = cm.random(10),
    offsetSize = cm.random(10),
    offsetAngle = cm.random(10),
    randomX = cm.randomNoise(0, width),
    randomY = cm.randomNoise(0, height),
    randomSize = cm.randomNoise(0, 100),
    randomAngle = cm.randomNoise(0, cm.TWO_PI),
    randomHue = cm.randomNoise(0, 360);

  function setup(app) {
    app.append(cm.clear, { fill: "black" });
  }

  function update(app) {
    offsetX += 0.01;
    offsetY += 0.01;
    offsetAngle += 0.01;
    offsetSize += 0.01;
    app
      .append(cm.group, {
        rotate: randomAngle(offsetAngle),
        x: randomX(offsetX),
        y: randomY(offsetY),
      })
      .append(cm.rect, {
        x: 0,
        y: 0,
        width: randomSize(offsetSize),
        height: randomSize(offsetSize),
        fill: cm.hsl(randomHue(offsetAngle, offsetSize), 100, 50),
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
