import * as cm from "../../src/index.js";
import { dispose } from "../dispose.js";

export async function terminalPoint() {
  const app = cm.app({
    cols: 10,
    rows: 3,
    frameRate: 5,
    renderer: await cm.terminal(),
  });

  let x = 0;

  app.on("update", () => {
    const i = x % app.prop("cols");
    const j = (x / app.prop("cols")) | 0;
    app.append(cm.background, { fill: "#000" });
    app.append(cm.point, { x: i, y: j, stroke: cm.cfb("@") });
    x += 1;
  });

  return app.call(dispose).start();
}
