import * as cm from "../../src/index.js";
import { dispose } from "../utils/dispose.js";

export async function terminalMatrix() {
  const app = cm.app({
    cols: 3,
    rows: 3,
    mode: "double",
    renderer: await cm.terminal(),
  });

  app
    .data([
      [" +", "-", "+ "],
      [" |", cm.wch("🚀"), "| "],
      [" +", "-", "+ "],
    ])
    .append(cm.group, { y: (_, i) => i })
    .data((d) => d)
    .append(cm.point, {
      y: 0,
      x: (_, i) => i,
      stroke0: (d) => d,
    });

  return app.call(dispose).render().node();
}
