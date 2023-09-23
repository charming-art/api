import * as cm from "./_cm.js";
import { dispose } from "./_dispose.js";
import { frame } from "./_frame.js";

export function oscillationBatons() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  app
    .frame(() => app.shape(cm.background, { fill: cm.rgb(255) }))
    .frame(() => {
      app
        .data([0, 1, 2])
        .shape(cm.group, {
          x: (_, i) => ((i + 0.5) * app.width()) / 3,
          y: app.height() / 2,
          rotate: (_, i) => app.frameCount() / 50 + i * 30,
        })
        .call((d) => d.shape(cm.link, { x: -80, y: 0, x1: 80, y1: 0 }))
        .call((d) => d.shape(cm.circle, { x: -80, y: 0, r: 5 }))
        .call((d) => d.shape(cm.circle, { x: 80, y: 0, r: 5 }));
    });

  return app.call(dispose).call(frame).start();
}
