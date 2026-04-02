import * as cm from "../../src/index.js";

export function domSetAttr() {
  return cm.svg`<svg ${{
    width: 100,
    height: 200,
    style_font_size: "100px",
    style_stroke_width: 2,
  }}/>`;
}
