import { mapValues } from "./mapValues.js";

export function mapPosition(flow, data, options) {
  const app = flow.app();
  const width = app.prop("width");
  const height = app.prop("height");
  const { x = {}, y = {} } = options;
  const newX = { ...x, range: [0, width] };
  const newY = { ...y, range: [0, height] };
  return mapValues(flow, data, { x: newX, y: newY });
}
