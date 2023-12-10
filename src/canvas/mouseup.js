export function canvas$mouseup(listener) {
  const node = this.node();
  if (arguments.length === 0) {
    node.removeEventListener("mouseup", this._mouseup);
  }
  this._mouseup = (e) => listener(e);
  node.addEventListener("mouseup", this._mouseup);
  return this;
}
