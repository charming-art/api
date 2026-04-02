import * as cm from "../../src/index.js";

export function domSetDataDrivenChildrenWithoutOptions() {
  return cm.svg`<svg ${{
    width: 100,
    height: 100,
  }}>
    <g ${{data: [1, 2, 3]}}/>
  </svg>`;
}
