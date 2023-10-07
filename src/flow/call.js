export function flow$call(callback, ...params) {
  callback(this, ...params);
  return this;
}
