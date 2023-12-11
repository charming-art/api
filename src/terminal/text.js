import { textSync } from "figlet";
import { standard as fontStandard } from "../font/standard.js";
import { bboxOf } from "./textBBox.js";

function normalizeColor(color, width, height) {
  if (typeof color === "function") return color(width, height);
  return () => color;
}

export function terminal$text({
  x,
  y,
  text,
  fill,
  textAlign = "start",
  textBaseline = "top",
  fontFamily = fontStandard(),
}) {
  const matrix = textSync(text, { font: fontFamily });
  const {
    x: startX,
    y: startY,
    width: textWidth,
    height: textHeight,
    lines,
  } = bboxOf(matrix, {
    x,
    y,
    textAlign,
    textBaseline,
  });
  fill = normalizeColor(fill, textWidth, textHeight);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const ch = line[j];
      this.point({
        x: startX + j,
        y: startY + i,
        stroke: { ch, fg: fill(j, i) },
      });
    }
  }
}
