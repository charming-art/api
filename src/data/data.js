import { Data } from "./index.js";

export function data$data(data) {
  const newData = new Data({ data, parent: this, app: this._app });
  this._children.push(newData);
  return newData;
}
