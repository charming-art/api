import * as cm from "../../src/index.js";

export function domCloneDataDrivenChildren() {
  return cm.svg`<svg ${{
    width: 100,
    height: 100,
  }}>
    <g ${{
      data: [1, 2, 3],
      transform: (d) => `translate(${d * 20}, 50)`,
    }}>
      <circle ${{r: 10}}/>
    </g>
  </svg>`;
}
