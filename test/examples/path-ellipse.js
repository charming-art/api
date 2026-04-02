import * as cm from "../../src/index.js";

export function pathEllipse() {
  const d = cm.pathEllipse(200, 200, 140, 90);
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
