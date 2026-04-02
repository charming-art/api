import * as cm from "../../src/index.js";

export function pathLine() {
  const d = cm.pathLine(30, 30, 370, 370);
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
