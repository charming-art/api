import { measureText } from "../measure";

export function canvas$textBBox({ text, fontSize, fontFamily, textAlign, textBaseline, x, y }) {
  const { width, height } = measureText(text, { fontSize, fontFamily });
  const startX = textAlign === "end" ? x - width : textAlign === "center" ? x - width / 2 : x;
  const startY = textBaseline === "bottom" ? y - height : textBaseline === "middle" ? y - height / 2 : y;
  return { x: startX, y: startY, width, height };
}
