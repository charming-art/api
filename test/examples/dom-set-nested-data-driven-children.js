import * as cm from "../../src/index.js";

export function domSetNestedDataDrivenChildren() {
  return cm.svg`<svg ${{
    width: 100,
    height: 100,
  }}>
    <g ${{data: [1, 2, 3]}}>
      <g ${{data: [4, 5]}}>
        <circle ${{
          cx: (d) => d * 5,
          cy: 50,
          r: 10,
        }}/>
      </g>
    </g>
  </svg>`;
}
