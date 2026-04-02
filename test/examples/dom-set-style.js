import * as cm from "../../src/index.js";

export function domSetStyle() {
  return cm.svg`<svg ${{
    style_font_size: "100px",
    style_stroke_width: 2,
  }}/>`;
}
