import { Data } from "../data";
import { valueOf } from "../data/_valueOf";

export function app$shape(render, options) {
  const values = valueOf([0], options);
  const data = new Data({
    data: [0],
    app: this,
    shape: { render, options },
    parent: null,
    value: Object.fromEntries(values),
  });
  this._data.push(data);
  return data;
}
