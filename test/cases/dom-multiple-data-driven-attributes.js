import * as cm from "../../src/index.js";

export function domMultipleDataDrivenAttributes() {
  return cm.svg`<circle ${{
    data: [1, 2, 3],
    r: (d) => d * 10,
    cx: (d) => d * 20,
    cy: 50,
  }}/>`;
}
