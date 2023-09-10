export function data$map(callback) {
  this._data = this._data.map(callback);
  return this;
}
