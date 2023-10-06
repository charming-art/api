import * as cm from "./_cm.js";
import { frame } from "./_frame.js";
import { dispose } from "./_dispose.js";
import { stats } from "./_stats.js";

export function vectorCircleBouncing() {
  const app = cm.app({
    width: 600,
    height: 200,
  });

  const location = cm.vec(app.width() / 2, app.height() / 2);
  const velocity = cm.vec(1, 3.3);

  app
    .frame(() => {
      location.add(velocity);
      if (!location.inX(app.width())) velocity.negX();
      if (!location.inY(app.height())) velocity.negY();
    })
    .frame(() => {
      app.append(cm.background, { fill: cm.rgb(255) });
      app.append(cm.circle, {
        x: location.x,
        y: location.y,
        r: 16,
        stroke: cm.rgb(0),
        fill: cm.rgb(175),
      });
    });

  return app.call(dispose).call(stats).call(frame).start();
}
