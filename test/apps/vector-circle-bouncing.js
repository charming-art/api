import * as cm from "./charming.js";

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
      app.background(cm.rgb(255)).shape(cm.circle, {
        x: location.x,
        y: location.y,
        r: 16,
        stroke: cm.rgb(0),
        fill: cm.rgb(175),
      });
    });

  return app
    .call((app) => {
      app.node().style.border = "solid #000 1px";
    })
    .start();
}
