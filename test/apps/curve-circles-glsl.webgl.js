import * as cm from "../../src/index.js";
import { dispose } from "../dispose.js";
import { stats } from "../stats.js";

export function curveCirclesGLSLWebGL() {
  const width = 700;
  const height = 700;
  const count = 22000;
  const theta = cm.range(count, 0, cm.TWO_PI);

  function update(app) {
    const time = app.prop("frameCount") / 50;
    const scale = 300;

    app.append(cm.clear, { fill: "black" });

    app
      .data(theta) // Bind Data.
      .append(cm.circle, {
        position: cm.glsl`vec2 position(float theta) {
          vec2 xy = vec2(cos(theta), sin(theta)) * (0.6 + 0.2 * cos(theta * 6.0 + cos(theta * 8.0 + ${time})));
          return xy * ${scale} + vec2(${width / 2}, ${height / 2});
        }`,
        r: cm.glsl`float r(float theta) {
          float d = 0.2 + 0.12 * cos(theta * 9.0 - ${time} * 2.0);
          return d * ${scale};
        }`,
        stroke: cm.glsl`vec4 stroke(float theta) {
          float th = 8.0 * theta + ${time} * 2.0;
          vec3 rgb = 0.6 + 0.4 * vec3(
            cos(th),
            cos(th - ${Math.PI} / 3.0),
            cos(th - ${Math.PI} * 2.0 / 3.0)
          );
          return vec4(rgb, 0.0);
        }`,
        strokeOpacity: cm.glsl`float strokeOpacity(float theta) {
          return 0.15 * 2000.0 / ${count};
        }`,
      });
  }

  return cm.app({ width, height, renderer: cm.webgl() }).on("update", update).call(dispose).call(stats).start().node();
}
