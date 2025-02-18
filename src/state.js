import {reactive} from "echox";

export function state(obj) {
  const rx = reactive();
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "function") rx.computed(key, value);
    else rx.state(key, value);
  }
  return rx.join()[0];
}
