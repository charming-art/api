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
  const vertices = [
    Vector.create(-10, -10),
    Vector.create(20, -15),
    Vector.create(15, 0),
    Vector.create(0, 10),
    Vector.create(-20, 15),
  ];
  const body = Bodies.fromVertices(x, y, vertices, { restitution: 0.2 });
  Body.setVelocity(body, Vector.create(cm.random(-5, 5), 0));
  Body.setAngularVelocity(body, 0.1);
  Composite.add(parent, body);
  return { body };
}

function checkBox(d, i, array, flow) {
  const { body } = d;
  const app = flow.app();
  if (body.bounds.min.y > app.prop("height")) {
    array.splice(i, 1);
    Composite.remove(body.parent, d);
  }
}

export function matterFallingPolygons() {
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

  function update() {
    if (cm.random(1) < 0.1) boxes.push(createBox(engine.world, w / 2, 50));

    app.append(cm.background, { fill: "#fff" });

    app
      .data(boxes)
      .process(cm.eachRight, checkBox)
      .append(cm.polygon, {
        x: (d) => d.body.vertices.map((d) => d.x),
        y: (d) => d.body.vertices.map((d) => d.y),
        fill: cm.rgb(127),
        stroke: cm.rgb(0),
        strokeWeight: 2,
      });

    app.data(boundaries).append(cm.rect, {
      x: (d) => d.body.position.x,
      y: (d) => d.body.position.y,
      rotate: (d) => d.body.angle,
      width: (d) => d.width,
      height: (d) => d.height,
      fill: cm.rgb(127),
      stroke: cm.rgb(0),
      strokeWeight: 2,
      anchor: "center",
    });

    Engine.update(engine);
  }

  return app.on("update", update).call(dispose).call(stats).call(frame).start();
}
