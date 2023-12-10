import * as d3 from "d3-geo";
import * as cm from "../../src/index.js";
import { dispose } from "../dispose.js";
import { stats } from "../stats.js";

// @see https://observablehq.com/d/a741f9a27e8c0e73
export function oscillationBeesSandBombs() {
  const width = 640;
  const radius = 12;
  const data = cm.cross(cm.range(20, -1, 1), cm.range(20, -1, 1));
  const circle = d3.geoCircle()();
  const projection = d3.geoOrthographic().translate([0, 0]).scale(radius);
  const path = d3.geoPath(projection);

  function draw(app) {
    app.append(cm.clear, { fill: cm.rgb(255) });

    app
      .data(data)
      .append(cm.circle, {
        x: (d) => d[0],
        y: (d) => d[1],
        r: radius,
        fill: "white",
        stroke: "black",
        strokeWidth: 1.5,
      })
      .call(applyScale);

    app
      .data(data)
      .append(cm.path, {
        x: (d) => d[0],
        y: (d) => d[1],
        fill: "black",
        d: (d) => {
          const [x, y] = d;
          const now = app.prop("frameCount") / 200;
          const l = ((Math.hypot(x, y) + Math.atan2(y, x) / (Math.PI * 2) - now) % 1) * -360;
          projection.rotate([0, l, -l]);
          const context = cm.pathArray();
          path.context(context)(circle);
          return context.toArray();
        },
      })
      .call(applyScale);
  }

  function applyScale(flow) {
    const app = flow.app();
    flow.transform(cm.mapAttrs, {
      x: { range: [40, app.prop("width") - 40] },
      y: { range: [40, app.prop("height") - 40] },
    });
  }

  return cm.app({ width: width, height: width }).on("update", draw).call(dispose).call(stats).start().node();
}
