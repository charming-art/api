import * as cm from "../../src/index.js";
import { dispose } from "../dispose.js";

export async function terminalText() {
  const app = cm.app({
    width: 1200,
    renderer: await cm.terminal(),
  });

  app.append(cm.text, {
    text: "hello world",
    x: app.prop("width") / 2,
    y: app.prop("height") / 2,
    textAlign: "center",
    textBaseline: "middle",
    fontFamily: cm.fontGhost(),
  });

  return app.call(dispose).start();
}
