export function data$map(callback) {
  this._maps.push(callback);
  return this;
}
