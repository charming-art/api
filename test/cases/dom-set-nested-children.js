import * as cm from "../../src/index.js";

export function domSetNestedChildren() {
  return cm.svg`<svg ${{
    width: 100,
    height: 100,
  }}>
    <g ${{data: [1, 2, 3]}}>
      <g>
        <circle ${{
          cx: (d) => d * 20,
          cy: 50,
          r: 10,
        }}/>
      </g>
    </g>
  </svg>`;
}
