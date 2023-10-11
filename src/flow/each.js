export function flow$each(callback) {
  const app = this._app;
  this._data.forEach((d, i, data) =>
    callback(d, { index: i, data, app, flow: this })
  );
  return this;
}
