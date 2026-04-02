import * as cm from "../../src/index.js";

export function domSetNonMarkChildren() {
  return cm.html`<div>hello<span>world</span>{key: "foo"}</div>`;
}
