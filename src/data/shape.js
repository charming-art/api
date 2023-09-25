import { Data } from "./index.js";
import { valueOf } from "./_valueOf.js";

export function data$shape(render, options) {
  const values = valueOf(this._data, options);
  const data = new Data({
    data: this._shape ? [0] : this._data,
    app: this._app,
    shape: { render, options },
    parent: this,
    value: Object.fromEntries(values),
  });
  this._children.push(data);
  return data;
}
