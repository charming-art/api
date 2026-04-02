import * as cm from "../../src/index.js";

export function domSetKebabCaseAttributes() {
  return cm.svg`<svg ${{
    "font-size": 100,
    "stroke-width": 2,
  }}/>`;
}
