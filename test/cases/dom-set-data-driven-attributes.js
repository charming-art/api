import * as cm from "../../src/index.js";

export function domSetDataDrivenAttributes() {
  return cm.svg`<svg ${{
    width: 100,
    height: 100,
  }}>
    <circle ${{
      data: [1, 2, 3],
      cx: (d) => d * 20,
      cy: 50,
      r: 10,
    }}/>
  </svg>`;
}
