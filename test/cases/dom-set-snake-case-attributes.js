import * as cm from "../../src/index.js";

export function domSetSnakeCaseAttributes() {
  return cm.svg`<svg ${{
    font_size: 100,
    stroke_width: 2,
  }}/>`;
}
