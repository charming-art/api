export function app$frame(callback, ...params) {
  this._frame.push([callback, ...params]);
  return this;
}
