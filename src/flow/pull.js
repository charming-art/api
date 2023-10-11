export function flow$pull(index) {
  this._data.splice(index, 1);
  return this;
}
