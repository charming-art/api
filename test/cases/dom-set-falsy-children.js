import * as cm from "../../src/index.js";

export function domSetFalsyChildren() {
  return cm.svg`<svg><g/><text>hello</text></svg>`;
}
