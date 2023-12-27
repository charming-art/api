import * as cm from "../../src/index.js";
import { interpolateRainbow } from "d3-scale-chromatic";
import { dispose } from "../dispose.js";

export function curveCircleClover() {
  const app = cm.app({
    width: 640,
    height: 640,
  });

  app
    .data(cm.range(120))
    .process(cm.map, (_, i, a) => i * (Math.PI / a.length))
    .append(cm.circle, {
      x: (t) => Math.cos(t) * Math.cos(t * 3),
      y: (t) => Math.sin(t) * Math.cos(t * 3),
      r: (t) => t,
      fill: (t) => t,
    })
    .transform(cm.mapPosition, { padding: 20 })
    .transform(cm.mapAttrs, {
      r: { range: [8, 20] },
      fill: { interpolate: interpolateRainbow },
    });

  return app.call(dispose).render().node();
}
