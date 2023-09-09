export function app$call(callback, ...params) {
  callback(this, ...params);
  return this;
}
