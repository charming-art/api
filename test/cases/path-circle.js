import * as cm from "../../src/index.js";

export function pathCircle() {
  const d = cm.pathCircle(200, 200, 120);
  return cm.svg`<svg ${{
    width: 400,
    height: 400,
    viewBox: "0 0 400 400",
  }}>
    <path ${{
      d,
      fill: "none",
      stroke: "#111",
      stroke_width: 2,
    }}/>
  </svg>`;
}
