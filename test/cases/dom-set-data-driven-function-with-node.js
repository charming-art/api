import * as cm from "../../src/index.js";

export function domSetDataDrivenFunctionWithNode() {
  return cm.svg`<circle ${{
    data: [1, 2, 3],
    r: (d, _i, _data, node) => node.clientWidth * d,
  }}/>`;
}
