import { normalizeColor } from "../color.js";
import { linear as scaleLinear } from "../scale/linear.js";

export function webgl$clear({ fill }) {
  const gl = this._gl;
  const [r, g, b, a] = normalizeColor(fill);
  const scale = scaleLinear([0, 255], [0, 1]);
  gl.clearColor(scale(r), scale(g), scale(b), scale(a));
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}
