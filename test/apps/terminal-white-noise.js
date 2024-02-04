import * as cm from "../../src/index.js";
import { dispose } from "../utils/dispose.js";
import { stats } from "../utils/stats.js";

// @see https://asciinema.org/a/19919
export async function terminalWhiteNoise() {
  const app = cm.app({
    renderer: await cm.terminal(),
    frameRate: 20,
  });

  const w = app.prop("width");
  const h = app.prop("height");

  const characters = cm.cross(cm.range(w), cm.range(h)).map((d) => ({ x: d[0], y: d[1] }));

  const textOptions = {
    text: cm.figlet("Charming"),
    x: w / 2,
    y: h / 2,
    textAlign: "center",
    textBaseline: "middle",
    fill: cm.gradientRainBowX(),
  };
  const bbox = app.textBBox(textOptions);
  const { x: tx, y: ty, width: tw, height: th } = bbox;
  const outside = ({ x, y }) => x < tx || x > tx + tw || y < ty || y > ty + th;

  function update() {
    app.append(cm.clear, { fill: "black" });

    app.append(cm.text, textOptions);

    app
      .data(characters)
      .process(cm.each, (d) => {
        if (d.lifespan) return d.lifespan--;
        d.ch = cm.randomChar();
        d.lifespan = cm.randomInt(3, 10);
      })
      .process(cm.filter, (d) => {
        if (outside(d)) return true;
        const p = cm.random(10);
        if (p < 0.5) return true;
        return false;
      })
      .append(cm.point, {
        x: (d) => d.x,
        y: (d) => d.y,
        stroke0: (d) => d.ch,
      });
  }

  return app.on("update", update).call(dispose).call(stats).start().node();
}
