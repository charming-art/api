import * as cm from "../../src/index.js";

export function circles() {
  const data = Array.from({length: 5}, (_, i) => i);
  const svg = cm.svg("svg", {
    width: 30 * (data.length + 1),
    height: 40,
    children: [
      cm.svg("circle", data, {
        cy: 20,
        r: 10,
        fill: (i) => (i % 2 ? "steelblue" : "orange"),
        attrs: (i) => ({fill: "red", cx: (i + 1) * 30}),
      }),
    ],
  });
  return svg.render();
}
