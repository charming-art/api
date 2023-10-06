import * as cm from "./_cm.js";
import { dispose } from "./_dispose.js";
import { frame } from "./_frame.js";
import { stats } from "./_stats.js";

export function oscillationBaton() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  app
    .frame(() => app.append(cm.background, { fill: cm.rgb(255) }))
    .frame(() => {
      const group = app.append(cm.group, {
        x: app.width() / 2,
        y: app.height() / 2,
        rotate: app.frameCount() / 50,
      });
      group.append(cm.link, { x: -80, y: 0, x1: 80, y1: 0 });
      group.append(cm.circle, { x: -80, y: 0, r: 5 });
      group.append(cm.circle, { x: 80, y: 0, r: 5 });
    });

  return app.call(dispose).call(stats).call(frame).start();
}
