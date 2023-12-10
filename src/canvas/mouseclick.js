export function canvas$mouseclick(listener) {
  const node = this.node();
  if (arguments.length === 0) {
    node.removeEventListener("click", this._mouseclick);
  }
  this._mouseclick = (e) => listener(e);
  node.addEventListener("click", this._mouseclick);
  return this;
}
