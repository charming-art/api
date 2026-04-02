import * as cm from "../../src/index.js";

export function domSetNestedCallbackDataDrivenChildren() {
  return cm.svg`<svg ${{
    width: 100,
    height: 100,
  }}>
    <g ${{data: [1, 2, 3]}}>
      <g ${{data: (d) => Array.from({length: d}, (_, i) => i)}}>
        <circle ${{r: 10, cx: (d) => d * 5, cy: 50}}/>
      </g>
    </g>
  </svg>`;
}
