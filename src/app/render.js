function renderNode(renderer, node, dimension, index = 0) {
  const data = node._data[index];
  const { render, I, value } = data;
  render(renderer, I, value, dimension);
  const children = node._children;
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
    for (const child of children) renderNode(renderer, child, dimension, i);
    if (value) renderer.restore();
  }
}

export function app$render() {
  const renderer = this._renderer;
  const dimension = { width: this.prop("width"), height: this.prop("height") };
  this._root._children.forEach((d) => renderNode(renderer, d, dimension));
  this._root._children = [];
  return this.node();
}
