export function flow$filter(callback) {
  const app = this._app;
  this._data = this._data.filter((d, i, data) =>
    callback(d, { index: i, data, app, flow: this })
  );
  return this;
}
