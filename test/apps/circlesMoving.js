import * as cm from "../../src/index.js";

export function circlesMoving() {
  const svg = cm.svg("svg", {
    width: 200,
    height: 250,
    loop: true,
    stroke: "red",
    strokeWidth: 4,
    children: () => [
      cm.svg("g", new Array(5), {
        transform: (_, i) => `translate(0, ${i * 50})`,
        children: () => [
          cm.svg("circle", {
            cx: Math.abs(Math.sin(Date.now() / 1000) * 200),
            cy: 25,
            r: 20,
          }),
        ],
      }),
    ],
  });
  return svg.render();
}

circlesMoving.skip = true;
