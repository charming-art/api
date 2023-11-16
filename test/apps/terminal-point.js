import * as cm from "../../src/index.js";
import { dispose } from "../dispose.js";

export async function terminalPoint() {
  const app = cm.app({
    renderer: await cm.terminal(),
  });

  let x = 0;

  app.on("update", () => {
    const i = x % app.prop("width");
    const j = (x / app.prop("width")) | 0;
    app.append(cm.clear, { fill: "#000" });
    app.append(cm.point, { x: i, y: j, stroke: cm.cfb("@") });
    x += 1;
  });

  return app.call(dispose).start();
}
