import * as cm from "../../src/index.js";
import { dispose } from "./_dispose.js";

export async function terminalMatrix() {
  const app = cm.app({
    mode: "double",
    cols: 3,
    rows: 3,
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
      stroke: (d) => cm.cfb(d),
    });

  return app.call(dispose).render();
}
