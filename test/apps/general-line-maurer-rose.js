import * as cm from "../../src/index.js";
import { dispose } from "../utils/dispose.js";

// @see https://observablehq.com/@recifs/a-rose-is-a-rose
export function generalLineMaurerRose() {
  const n = 10;
  const d = 17;
  const angles = cm.range(360, 0, 360).map((d) => (d * Math.PI) / 180);

  const app = cm.app({
    width: 450,
    height: 450,
  });

  app
    .data(angles)
    .append(cm.line, {
      x: (i) => Math.sin(n * d * i) * Math.cos(d * i),
      y: (i) => Math.sin(n * d * i) * Math.sin(d * i),
      stroke: "black",
      strokeWidth: 0.33,
      close: true,
    })
    .transform(cm.mapPosition, {
      domainX: [-1, 1],
      domainY: [-1, 1],
    });

  app
    .data(angles)
    .append(cm.line, {
      x: (i) => Math.sin(n * i) * Math.cos(i),
      y: (i) => Math.sin(n * i) * Math.sin(i),
      stroke: "red",
      strokeWidth: 2.5,
      close: true,
    })
    .transform(cm.mapPosition, {
      domainX: [-1, 1],
      domainY: [-1, 1],
    });

  return app.call(dispose).render().node();
}
