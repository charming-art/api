import { normalizeColorString } from "../color.js";

export function canvas$text({
  text,
  x,
  y,
  fill,
  stroke,
  strokeWidth,
  fillOpacity,
  strokeOpacity,
  fontFamily,
  textAlign,
  textBaseline,
  fontSize = 14,
  fontWeight = "normal",
}) {
  stroke = normalizeColorString(stroke, strokeOpacity);
  fill = normalizeColorString(fill, fillOpacity);
  const context = this._context;
  context.save();
  if (stroke) context.strokeStyle = stroke;
  if (strokeWidth) context.lineWidth = strokeWidth;
  if (fill) context.fillStyle = fill;
  if (textAlign) context.textAlign = textAlign;
  if (textBaseline) context.textBaseline = textBaseline;
  context.font = `${fontWeight} ${fontSize}px ${fontFamily}`.trim();
  context.fillText(text, x, y);
  context.restore();
}
