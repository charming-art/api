import * as cm from "./_cm.js";
import { dispose } from "./_dispose.js";

export function circleClover() {
  const app = cm.app({
    width: 640,
    height: 640,
  });

  app
    .data(cm.range(240))
    .map((_, i, array) => (i * Math.PI * 2) / array.length)
    .append(cm.circle, {
      x: {
        value: (t) => Math.cos(t) * Math.cos(t * 3),
        range: [15, app.prop("width") - 30],
      },
      y: {
        value: (t) => Math.sin(t) * Math.cos(t * 3),
        range: [15, app.prop("height") - 30],
      },
      r: {
        value: (_, i) => i,
        range: [1, 15],
      },
    });

  return app.call(dispose).render();
}
