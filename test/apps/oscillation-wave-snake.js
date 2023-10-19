import * as cm from "./_cm.js";
import { dispose } from "./_dispose.js";
import { frame } from "./_frame.js";
import { stats } from "./_stats.js";

export function oscillationWaveSnake() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const I = cm.range(50);
  const X = cm.range(I.length, cm.TWO_PI);
  const X1 = cm.range(I.length, cm.TWO_PI * 2);
  const X2 = cm.range(I.length, cm.TWO_PI / 3);

  app
    .on('update', () => app.append(cm.background, { fill: cm.rgb(255) }))
    .on('update', () => {
      app.data(I).append(cm.circle, {
        x: {
          value: (d) => d,
          range: [0, app.width()],
        },
        y: {
          value: (d) => {
            const offset = app.frameCount() / 120;
            const x = Math.sin(X[d] + offset) * 2;
            const x1 = Math.sin(X1[d] + offset) * 1;
            const x2 = Math.sin(X2[d] + offset) * 3;
            return x * x1 * x2;
          },
          range: [0, app.height()],
        },
        r: 20,
        fill: "rgba(175, 175, 175, 0.5)",
        stroke: "#000",
        strokeWidth: 1,
      });
    });

  return app.call(dispose).call(stats).call(frame).start();
}
