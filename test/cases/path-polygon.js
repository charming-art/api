import * as cm from "../../src/index.js";

export function pathPolygon() {
  const d = cm.pathPolygon([
    [200, 40],
    [340, 160],
    [280, 320],
    [120, 320],
    [60, 160],
  ]);
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
