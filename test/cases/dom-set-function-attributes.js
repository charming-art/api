import * as cm from "../../src/index.js";

export function domSetFunctionAttributes() {
  return cm.svg`<svg ${{
    width: () => 100,
    height: () => 200,
  }}/>`;
}
