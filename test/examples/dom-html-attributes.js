import * as cm from "../../src/index.js";

export function domHtmlAttributes() {
  return cm.html`<div ${{
    className: "hello",
    disabled: true,
    checked: true,
    selected: true,
    readOnly: true,
    hidden: true,
    placeholder: "hello",
    title: "hello",
    alt: "hello",
    href: "https://charmingjs.org",
    src: "https://charmingjs.org",
  }}/>`;
}
