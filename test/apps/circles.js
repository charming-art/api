import * as cm from "../../src/index.js";

export function circles() {
  const data = Array.from({length: 5}, (_, i) => i);
  return cm.create({width: 30 * (data.length + 1), height: 40}).render([
    cm.svg("circle", data, {
      cy: 20,
      r: 10,
      fill: (i) => (i % 2 ? "steelblue" : "orange"),
      attrs: (i) => ({fill: "red", cx: (i + 1) * 30}),
    }),
  ]);
}
