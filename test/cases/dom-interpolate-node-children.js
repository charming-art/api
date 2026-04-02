import * as cm from "../../src/index.js";

export function domInterpolateNodeChildren() {
  return cm.svg`<svg>
    <g ${{data: [1, 2, 3]}}>
      ${cm.svg`<circle ${{r: 10}}/>`}
    </g>
  </svg>`;
}
