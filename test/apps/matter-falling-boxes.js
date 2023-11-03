import * as cm from "../../src/index.js";
import { frame } from "../frame.js";
import { dispose } from "../dispose.js";
import { stats } from "../stats.js";
import { Engine, Bodies, Composite, Body, Vector } from "matter-js";

function createBoundary(parent, x, y, width, height) {
  const body = Bodies.rectangle(x, y, width, height, { isStatic: true });
  Composite.add(parent, body);
  return { body, width, height };
}

function createBox(parent, x, y) {
  const width = cm.random(8, 16);
  const height = cm.random(8, 16);
  const body = Bodies.rectangle(x, y, width, height, { restitution: 0.6 });
  Body.setVelocity(body, Vector.create(cm.random(-5, 5), 0));
  Body.setAngularVelocity(body, 0.1);
  Composite.add(parent, body);
  return { body, width, height };
}

function checkBox(d, i, array, flow) {
  const { body } = d;
  const app = flow.app();
  if (body.bounds.min.y > app.prop("height")) {
    array.splice(i, 1);
    Composite.remove(body.parent, d);
  }
}

export function matterFallingBoxes() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const engine = Engine.create();
  const w = app.prop("width");
  const h = app.prop("height");

  const boxes = [];
  const boundaries = [
    createBoundary(engine.world, w / 4, h - 5, w / 2 - 50, 10),
    createBoundary(engine.world, (3 * w) / 4, h - 50, w / 2 - 50, 10),
  ];

  const x = (d) => d.body.position.x;
  const y = (d) => d.body.position.y;
  const rotate = (d) => d.body.angle;
  const width = (d) => d.width;
  const height = (d) => d.height;
  const rectOptions = {
    x,
    y,
    width,
    height,
    rotate,
    fill: cm.rgb(127),
    stroke: cm.rgb(0),
    strokeWeight: 2,
    anchor: "center",
  };

  function update() {
    if (cm.random(1) < 0.1) boxes.push(createBox(engine.world, w / 2, 50));

    app.append(cm.background, { fill: "#fff" });

    app
      .data(boxes)
      .process(cm.eachRight, checkBox)
      .append(cm.rect, rectOptions);

    app.data(boundaries).append(cm.rect, rectOptions);

    Engine.update(engine);
  }

  return app.on("update", update).call(dispose).call(stats).call(frame).start();
}
