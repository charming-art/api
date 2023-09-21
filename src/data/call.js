export function data$call(callback, ...params) {
  callback(this, params);
  return this;
}
