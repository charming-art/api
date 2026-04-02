import * as cm from "../../src/index.js";

export function domSetCallbackChildren() {
  return cm.svg`<g ${{
    data: [0, 1, 2],
    transform: (d) => `translate(${(d + 1) * 50}, 0)`,
  }}>
    ${(d, i, data) => {
      const a = d + i + data.length;
      return cm.svg`<circle ${{
        r: 20,
        cy: 30,
        fill: `rgb(${a}, ${a}, ${a})`,
      }}/>`;
    }}
  </g>`;
}
