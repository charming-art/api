import * as cm from "./_cm.js";
import { dispose } from "./_dispose.js";
import { frame } from "./_frame.js";

export function oscillationWave() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const X = cm.range(20, cm.TWO_PI);

  app
    .frame(() => app.shape(cm.background, { fill: cm.rgb(255) }))
    .frame(() => {
      app.data(X).shape(cm.circle, {
        x: {
          value: (d) => d,
          range: [0, app.width()],
        },
        y: {
          value: (d) => Math.sin(d + app.frameCount() / 20),
          range: [0, app.height()],
        },
        r: 20,
        fill: "rgba(175, 175, 175, 0.5)",
        stroke: "#000",
        strokeWidth: 2,
      });
    });

  return app.call(dispose).call(frame).start();
}
