import * as cm from "../../src/index.js";

export function domSetFunctionAttributesWithNode() {
  return cm.svg`<svg ${{
    width: (node) => node.clientWidth,
    height: (node) => node.clientHeight,
  }}/>`;
}
