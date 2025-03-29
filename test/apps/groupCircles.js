import * as cm from "../../src/index.js";

export function groupCircles() {
  const data = Array.from({length: 5}, (_, i) => i);
  const app = cm.app({
    width: 30 * (data.length + 1),
    height: 70,
    draw: [
      cm.svg("g", data, {
        transform: (i) => `translate(${(i + 1) * 30}, 20)`,
        children: [cm.svg("circle", {r: 10, fill: "black"})],
      }),
      cm.svg("g", data, {
        transform: (i) => `translate(${(i + 1) * 30}, 50)`,
        children: [
          cm.svg("g", {
            children: [
              [cm.svg("circle", {r: (i) => (i + 1) * 2, fill: "black"})],
              cm.svg("circle", {r: (i) => (i + 1) * 1, fill: "white"}),
            ],
          }),
        ],
      }),
    ],
  });
  return app.render();
}
