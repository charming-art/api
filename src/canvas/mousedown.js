export function canvas$mousedown(listener) {
  const node = this.node();
  if (arguments.length === 0) {
    node.removeEventListener("mousedown", this._mousedown);
  }
  this._mousedown = (e) => listener(e);
  node.addEventListener("mousedown", this._mousedown);
  return this;
}
