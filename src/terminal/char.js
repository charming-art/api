import { CELL_SIZE, TEXT_BASELINE } from "./constant.js";

export function terminal$char(char, i, j, fg, bg, wide = false) {
  const { width: cols, mode, cellWidth, cellHeight, fontWeight, fontSize, fontFamily } = this._props;

  const x = cellWidth * i;
  const y = cellHeight * j;
  const index = (cols * j + i) * CELL_SIZE;

  if (bg) {
    this._context.fillStyle = bg;
    this._context.fillRect(x, y, cellWidth, cellHeight);
    this._buffer[index + 2] = bg;
  }

  if (fg) {
    this._context.fillStyle = fg;
    this._buffer[index + 1] = fg;
  }

  if (!char) return;
  this._context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  this._context.textBaseline = TEXT_BASELINE;
  this._context.fillText(char, x, y + cellHeight);
  this._buffer[index] = char;

  if (mode !== "double" || wide) return;
  this._context.fillText(char, x + cellWidth / 2, y + cellHeight);
  this._buffer[index] += char;

  return this;
}
