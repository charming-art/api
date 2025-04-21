import * as cm from "../../src/index.js";

export function groupCircles() {
  const data = Array.from({length: 5}, (_, i) => i);
  const svg = cm.svg("svg", {
    width: 30 * (data.length + 1),
    height: 90,
    children: [
      cm.svg("g", data, {
        transform: (i) => `translate(${(i + 1) * 30}, 20)`,
        children: [cm.svg("circle", {r: 10, fill: "black"})],
      }),
      cm.svg("g", data, {
        transform: (i) => `translate(${(i + 1) * 30}, 50)`,
        children: [[cm.svg("circle", {r: 10, fill: "black"}), cm.svg("circle", {r: 5, fill: "white"})]],
      }),
      cm.svg("g", data, {
        transform: (i) => `translate(${(i + 1) * 30}, 80)`,
        children: (i) => [cm.svg("circle", {r: (i + 1) * 2, fill: "black"})],
      }),
    ],
  });
  return svg.render();
}
