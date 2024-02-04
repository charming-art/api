import * as cm from "../../src/index.js";
import { dispose } from "../utils/dispose.js";
import { stats } from "../utils/stats.js";

function updateString(d, i, array, flow) {
  const app = flow.app();
  const height = app.prop("height");
  const { chars, lifespan, length } = array[i];
  const curLength = chars.length;

  // Create a new string if the current one is dead.
  // Fade out the string if lifespan is less than the current length.
  // Fade in the string if lifespan is greater than the current length.
  if (lifespan < 0) array[i] = createString(height);
  else if (lifespan <= curLength) chars[curLength - lifespan] = "";
  else if (lifespan > curLength) {
    for (let i = length - 1; i < curLength; i++) chars[i] = cm.randomChar();
    chars.push(cm.randomChar());
  }

  d.lifespan--;
}

function createString(height) {
  const lifespan = cm.randomInt(height);
  const length = cm.randomInt(lifespan);
  const chars = cm.range(length).map(cm.randomChar);
  const y = cm.randomInt(0, 15);
  return { lifespan, length, chars, y };
}

// @see https://asciinema.org/a/19942
export async function terminalCharacterMatrix() {
  let strings = null;

  function update(app) {
    const width = app.prop("width");
    const height = app.prop("height");
    if (!strings) strings = cm.range(width).map(() => createString(height));

    app.append(cm.clear, { fill: "black" });

    app
      .data(strings)
      .process(cm.eachRight, updateString)
      .append(cm.group, {
        x: (_, i) => i,
        y: (d) => d.y,
      })
      .data((d) => d.chars)
      .append(cm.point, {
        x: 0,
        y: (_, i) => i,
        stroke0: (d) => d,
        stroke1: "#6EBD41",
      });
  }

  const app = cm.app({
    renderer: await cm.terminal(),
    frameRate: 10,
    fontWeight: "bold",
  });

  return app.on("update", update).call(dispose).call(stats).start().node();
}
