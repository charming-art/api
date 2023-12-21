import * as cm from "../../src/index.js";
import { dispose } from "../dispose.js";
import { stats } from "../stats.js";

// @see: https://www.shadertoy.com/view/mtyGWy
export function shapeRectFillWebGL() {
  const width = 640;
  const height = 360;
  const palette = cm.glsl`vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    return a + b * cos(3.1415926 * 2.0 * (c * t + d));
  }`;

  function update(app) {
    const time = app.prop("frameCount") / 50;
    const fill = cm.glsl`vec4 fill(vec2 coord, vec4 color) {
      vec2 uv = (coord - vec2(${width}, ${height})) / ${height};
      vec2 uv0 = uv;
      vec3 rgb = vec3(0.0);
      for (float i = 0.0; i < 4.0; i++) {
        uv = fract(uv * 1.5) - 0.5;
        float d = length(uv) * exp(-length(uv0));
        vec3 col = ${palette}(length(uv0) + i * 0.4 + ${time} * 0.4);
        d = sin(d * 8.0 + ${time}) / 8.0;
        d = abs(d);
        d = pow(0.01 / d, 1.2);
        rgb += col * d;
      }
      return vec4(rgb, 1.0);
    }`;
    app.append(cm.rect, { x: 0, y: 0, width, height, fill });
  }

  return cm
    .app({
      renderer: cm.webgl(),
      width,
      height,
    })
    .call(dispose)
    .call(stats)
    .on("update", update)
    .start()
    .node();
}
