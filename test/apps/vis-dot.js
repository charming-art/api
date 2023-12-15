import * as cm from "../../src/index.js";
import { dispose } from "../dispose.js";

function dot(flow, { x, y, marginLeft = 40, marginTop = 30, marginRight = 0, marginBottom = 30 }) {
  const app = flow.app();
  const [data] = flow.data();
  const I = cm.range(data.length);
  const scaleX = cm.scaleLinear(cm.extent(x), [marginLeft, app.prop("width") - marginRight]);
  const scaleY = cm.scaleLinear(cm.extent(y), [app.prop("height") - marginBottom, marginTop]);
  const X = x.map(scaleX);
  const Y = y.map(scaleY);
  flow.data(I).append(cm.circle, {
    x: (i) => X[i],
    y: (i) => Y[i],
    fill: "black",
    r: 4,
  });
}

export function visDot() {
  const data = cm.range(100).map(() => [cm.random(), cm.random()]);

  const app = cm.app({
    width: 640,
    height: 480,
  });

  app.data(data).append(dot, {
    x: (d) => d[0],
    y: (d) => d[1],
  });

  return app.call(dispose).render().node();
}
