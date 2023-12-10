import { CELL_SIZE } from "./constant.js";

export function terminal$toString() {
  let string = "";
  const { width: cols, height: rows } = this._props;
  const { _mode: mode, _buffer: buffer } = this;
  for (let j = 0; j < rows; j++) {
    if (j !== 0) string += "\n";
    for (let i = 0; i < cols; i++) {
      const index = (cols * j + i) * CELL_SIZE;
      const empty = mode === "double" ? "··" : "·";
      const char = buffer[index] || empty;
      string += char;
    }
  }
  return string;
}
