export function data$each(callback, ...params) {
  this._data.forEach((d, i, data) =>
    callback(d, i, data, this._app, ...params)
  );
  return this;
}
