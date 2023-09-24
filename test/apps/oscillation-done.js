import * as cm from "./_cm.js";
import { dispose } from "./_dispose.js";
import { frame } from "./_frame.js";

export function oscillationDone() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  app
    .frame(() => app.shape(cm.background, { fill: cm.rgb(255) }))
    .frame(() => {
      const r = 75;
      const theta = app.frameCount() / 50;
      const group = app.shape(cm.group, {
        x: app.width() / 2,
        y: app.height() / 2,
      });
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      group.shape(cm.link, { x: 0, y: 0, x1: x, y1: y });
      group.shape(cm.circle, { x, y, r: 16 });
    });

  return app.call(dispose).call(frame).start();
}
