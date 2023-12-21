import * as cm from "../../src/index.js";
import { frame } from "../frame.js";
import { dispose } from "../dispose.js";

export function shapeRectWebGL() {
  const app = cm.app({
    width: 600,
    height: 200,
    renderer: cm.webgl(),
  });

  app
    .data([
      [0, 0, 50, 25],
      [100, 100, 50, 25],
    ])
    .append(cm.rect, {
      x: (d) => d[0],
      y: (d) => d[1],
      width: (d) => d[2],
      height: (d) => d[3],
      fill: (_, i) => (i ? "steelblue" : "orange"),
    });

  return app.call(dispose).call(frame).render().node();
}
