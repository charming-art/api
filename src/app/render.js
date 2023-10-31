function renderNode(renderer, node, dimension, index = 0) {
  const data = node._data[index];
  const { render, I, value } = data;
  render(renderer, I, value, dimension);
  const children = node._children;
  if (!children.length) return;
  for (const i of I) {
    if (value) {
      const {
        x: X = [],
        y: Y = [],
        translateX: TX = [],
        translateY: TY = [],
        rotate: R = [],
      } = value;
      const x = X[i] ?? 0;
      const y = Y[i] ?? 0;
      const r = R[i];
      const tx = TX[i];
      const ty = TY[i];
      renderer.save();
      if (tx || ty) {
        renderer.translate(tx ?? 0, ty ?? 0);
        if (r !== undefined) renderer.rotate(r);
        renderer.translate(x, y);
      } else {
        renderer.translate(x, y);
        if (r !== undefined) renderer.rotate(r);
      }
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
  if (this._renderer.render) this._renderer.render();
  return this.node();
}
