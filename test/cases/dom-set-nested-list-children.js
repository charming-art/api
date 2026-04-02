import * as cm from "../../src/index.js";

export function domSetNestedListChildren() {
  return cm.svg`<svg ${{
    width: 100,
    height: 100,
  }}>
    ${[[1, 2, 3].map((d) => cm.svg`<circle ${{r: d}}/>`)]}
  </svg>`;
}
