import * as cm from "./_cm.js";
import { dispose } from "./_dispose.js";

export function circleClover() {
  const app = cm.app({
    width: 640,
    height: 640,
  });

  app
    .data(cm.range(240))
    .map((_, { index, data }) => (index * Math.PI * 2) / data.length)
    .shape(cm.circle, {
      x: {
        value: (t) => Math.cos(t) * Math.cos(t * 3),
        range: [15, app.width() - 30],
      },
      y: {
        value: (t) => Math.sin(t) * Math.cos(t * 3),
        range: [15, app.height() - 30],
      },
      r: {
        value: (_, i) => i,
        range: [1, 15],
      },
    });

  return app.call(dispose).render();
}
