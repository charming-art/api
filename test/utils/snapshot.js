export const CLASS_NAME = "__SNAPSHOT__";

export function snapshot(app) {
  const node = app.node();
  node.classList.add(CLASS_NAME);
}
