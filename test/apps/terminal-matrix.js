import * as cm from "../../src/index.js";
import { dispose } from "../dispose.js";

export async function terminalMatrix() {
  const app = cm.app({
    mode: "double",
    width: "3",
    height: "3",
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

  return app.call(dispose).render().node();
}
