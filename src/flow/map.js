export function flow$map(callback) {
  const app = this._app;
  this._data = this._data.map((d, i, data) =>
    callback(d, { index: i, data, app })
  );
  return this;
}
