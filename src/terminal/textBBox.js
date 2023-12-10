import { textSync } from "figlet";
import { standard as fontStandard } from "../font/standard.js";

export function bboxOf(matrix, { x, y, textAlign, textBaseline }) {
  const lines = matrix.split("\n");
  const height = lines.length;
  const width = Math.max(...lines.map((l) => l.length));
  const startX = textAlign === "left" ? x - width : textAlign === "center" ? x - width / 2 : x;
  const startY = textBaseline === "bottom" ? y - height : textBaseline === "middle" ? y - height / 2 : y;
  return { lines, x: startX, y: startY, width, height };
}

export function terminal$textBBox({
  text,
  fontFamily = fontStandard(),
  textAlign = "start",
  textBaseline = "top",
  x = 0,
  y = 0,
} = {}) {
  const matrix = textSync(text, {
    font: fontFamily,
  });
  const bbox = bboxOf(matrix, { textAlign, textBaseline, x, y });
  return { x: bbox.x, y: bbox.y, width: bbox.width, height: bbox.height };
}
