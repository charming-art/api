import { Flow } from "../flow";
import { valueOf } from "../flow/_valueOf";

export function app$append(render, options) {
  const values = valueOf([0], options);
  const flow = new Flow({
    data: [0],
    app: this,
    shape: { render, options },
    parent: null,
    value: Object.fromEntries(values),
  });
  this._children.push(flow);
  return flow;
}
