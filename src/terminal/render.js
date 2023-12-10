import { CELL_SIZE, NULL_VALUE } from "./constant.js";

function decodeColor(color) {
  if (color === NULL_VALUE) return undefined;
  const r = (color & 0xff0000) >> 16;
  const g = (color & 0x00ff00) >> 8;
  const b = color & 0x0000ff;
  return `rgb(${r}, ${g}, ${b})`;
}

function decodeChar(n) {
  if (n === NULL_VALUE) return ["", 0];
  const first = n >> 31;
  const n1 = n & 0x0fffffff;
  const w = first === 0 ? 1 : 2;
  return [String.fromCodePoint(n1), w];
}

export function terminal$render() {
  const bufferPtr = this._backend.render();
  const { width: cols, height: rows } = this._props;
  const buffer = new Uint32Array(this._memory.buffer, bufferPtr, cols * rows * CELL_SIZE);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const index = (cols * i + j) * CELL_SIZE;
      const [ch, wch] = decodeChar(buffer[index]);
      const [ch1, wch1] = decodeChar(buffer[index + 1]);
      const fg = decodeColor(buffer[index + 2]);
      const bg = decodeColor(buffer[index + 3]);
      const wide = wch + wch1 >= 2;
      const ch2 = ch + ch1;
      if (ch2 || fg) this.char(ch2, j, i, fg, bg, wide);
    }
  }
  return this;
}
