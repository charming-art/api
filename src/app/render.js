function renderFlow(renderer, node, dimension) {
  const { render, I, value } = node._data;
  const children = node._children;
  render(renderer, I, value, dimension);
  if (!children.length) return;
  for (const i of I) {
    if (value) {
      const { x: X, y: Y, rotate: R = [] } = value;
      const x = X[i];
      const y = Y[i];
      const r = R[i];
      renderer.save();
      renderer.translate(x, y);
      if (r !== undefined) renderer.rotate(r);
    }
    children.forEach((d) => renderFlow(renderer, d, dimension));
    if (value) {
      renderer.restore();
    }
  }
}

export function app$render() {
  const renderer = this._renderer;
  const dimension = {
    width: this.width(),
    height: this.height(),
  };
  this._children.forEach((d) => renderFlow(renderer, d, dimension));
  // console.log(this._children);
  this._children = [];
  return this.node();
}
