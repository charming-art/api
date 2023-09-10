export function data$each(callback) {
  this._data.forEach(callback);
  return this;
}
