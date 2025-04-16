import * as cm from "../../src/index.js";

export function circleMoving() {
  const svg = cm.svg("svg", {
    width: 200,
    height: 50,
    loop: true,
    children: () => [
      cm.svg("circle", {
        cx: Math.abs(Math.sin(Date.now() / 1000) * 200),
        cy: 25,
        r: 20,
        stroke: "red",
        strokeWidth: 4,
      }),
    ],
  });
  return svg.render();
}

circleMoving.skip = true;
