export function data$filter(callback) {
  this._data.filter(callback);
  return this;
}
