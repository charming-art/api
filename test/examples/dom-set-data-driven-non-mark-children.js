import * as cm from "../../src/index.js";

export function domSetDataDrivenNonMarkChildren() {
  return cm.html`<div>
    <span
      ${{
        data: [1, 2, 3],
        textContent: (d, i) => `${i}-${d}`,
      }}
    />
  </div>`;
}
