export function app$prop(name) {
  const props = this._props;
  const rendererProps = this._renderer._props || {};
  if (arguments.length === 0) return { ...rendererProps, ...props };
  return props[name] || rendererProps[name];
}
