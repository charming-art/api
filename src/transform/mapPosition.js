import { mapAttrs } from "./mapAttrs.js";

export function mapPosition(
  flow,
  data,
  {
    scaleX,
    scaleY,
    domainX,
    domainY,
    reverseY = false,
    reverseX = false,
    padding = 0,
    keysX = ["x", "x1"],
    keysY = ["y", "y1"],
  } = {}
) {
  const app = flow.app();
  const width = app.prop("width");
  const height = app.prop("height");
  const rangeX = [padding, width - padding * 2];
  const rangeY = [padding, height - padding * 2];

  if (reverseX) rangeX.reverse();
  if (reverseY) rangeY.reverse();

  const X = keysX.map((key) => [
    key,
    {
      domain: domainX,
      range: rangeX,
      scale: scaleX,
    },
  ]);

  const Y = keysY.map((key) => [
    key,
    {
      domain: domainY,
      range: rangeY,
      scale: scaleY,
    },
  ]);

  return mapAttrs(flow, data, Object.fromEntries([...X, ...Y]));
}
