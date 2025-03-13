import * as cm from "../../src/index.js";

export function groupCircles() {
  const data = Array.from({length: 5}, (_, i) => i);
  const app = cm.app({
    width: 30 * (data.length + 1),
    height: 40,
    draw: [
      cm.svg("g", data, {
        transform: (i) => `translate(${(i + 1) * 30}, 20)`,
        children: [
          cm.svg("circle", {
            r: 10,
            fill: "black",
          }),
        ],
      }),
    ],
  });
  return app.render();
}
