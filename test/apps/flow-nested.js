import * as cm from "./_cm.js";
import { dispose } from "./_dispose.js";

export function flowNested() {
  const app = cm.app({
    width: 640,
    height: 640,
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

  return app.call(dispose).render();
}
