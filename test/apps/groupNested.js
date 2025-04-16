import * as cm from "../../src/index.js";

export function groupNested() {
  const svg = cm.svg("svg", {
    children: [
      cm.svg("g", {
        children: [
          cm.svg("g", {
            children: [cm.svg("circle", {cx: 50, cy: 50, r: 50})],
          }),
        ],
      }),
    ],
  });
  return svg.render();
}
