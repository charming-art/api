import * as cm from "../../src/index.js";
import { dispose } from "../utils/dispose.js";
import { frame } from "../utils/frame.js";

export function _canvasCircle() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  app.append(cm.circle, {
    x: 100,
    y: 100,
    r: 50,
    fill: "orange",
  });

  return app.call(dispose).call(frame).render().node();
}
