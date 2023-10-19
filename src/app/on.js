export function app$on(typename, callback) {
  this._emitter.on(typename, callback);
  return this;
}
