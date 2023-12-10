import * as cm from "../../src/index.js";
import { frame } from "../frame.js";
import { dispose } from "../dispose.js";
import { stats } from "../stats.js";

export function randomWalk() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  let x = app.prop("width") / 2;
  let y = app.prop("height") / 2;
  app.on("update", () => {
    app.append(cm.circle, { x, y, r: 1, fill: "#000" });
    const direction = Math.floor(cm.random(4));
    if (direction === 0) y -= 1;
    else if (direction === 1) x += 1;
    else if (direction === 2) y += 1;
    else x -= 1;
  });

  return app.call(dispose).call(stats).call(frame).start().node();
}
