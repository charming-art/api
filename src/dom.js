import {html as _html} from "echox";

// Exclude for Observable Notebook.
// @see https://github.com/observablehq/runtime/issues/375
function exclude(proxy) {
  const keys = ["then", "next", "return"];
  return new Proxy(proxy, {
    get: (target, name) => {
      if (keys.includes(name)) return;
      return Reflect.get(target, name);
    },
  });
}

export const SVG = exclude(_html("http://www.w3.org/2000/svg"));

export const HTML = exclude(_html);
