import * as cm from "../../src/index.js";

export function domSetDataChildrenStringNodes() {
  return cm.svg`<svg>
    <g ${{data: [1, 2, 3]}}>
      hello
    </g>
  </svg>`;
}
