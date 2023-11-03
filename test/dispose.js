export function dispose(app) {
  const node = app.node();
  Object.assign(node, {
    clear: () => app.dispose(),
  });
}
