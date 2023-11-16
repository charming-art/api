import * as cm from "../../src/index.js";
import { dispose } from "../dispose.js";

export function curveCircleClover() {
  const app = cm.app({
    width: 640,
    height: 640,
  });

  app
    .data(cm.range(240))
    .process(cm.map, (_, i, a) => (i * Math.PI * 2) / a.length)
    .append(cm.circle, {
      x: (t) => Math.cos(t) * Math.cos(t * 3),
      y: (t) => Math.sin(t) * Math.cos(t * 3),
      r: (_, i) => i,
    })
    .transform(cm.mapProps, {
      x: { range: [15, app.prop("width") - 30] },
      y: { range: [15, app.prop("height") - 30] },
      r: { range: [1, 15] },
    });

  return app.call(dispose).render();
}
