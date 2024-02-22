import * as cm from "../../src/index.js";
import { dispose } from "../utils/dispose.js";
import { frame } from "../utils/frame.js";
import { snapshot } from "../utils/snapshot.js";

export function _canvasNested() {
  const app = cm.app({
    width: 640,
    height: 200,
  });

  const groups = app.data([[0, 5, 10], [1, 6], [2]]).append(cm.group, {
    x: (_, i) => i * 100 + 20,
    y: 20,
  });

  const circles = groups
    .data((d) => d)
    .append(cm.circle, {
      x: (d) => d * 10,
      y: (d) => d * 10,
      fill: "red",
      r: 10,
    });

  const rect = circles.append(cm.rect, {
    x: 0,
    y: 0,
    width: 10,
    height: 10,
    fill: "blue",
  });

  rect.data([1, 2]).append(cm.circle, {
    x: (d) => d * 10,
    y: (d) => d * 10,
    r: 5,
    fill: "orange",
  });

  return app.call(dispose).call(snapshot).call(frame).render().node();
}
