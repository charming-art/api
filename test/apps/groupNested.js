import * as cm from "../../src/index.js";

export function groupNested() {
  const app = cm.app({
    draw: [
      cm.svg("g", {
        children: [
          cm.svg("g", {
            children: [cm.svg("circle", {cx: 50, cy: 50, r: 50})],
          }),
        ],
      }),
    ],
  });
  return app.render();
}
