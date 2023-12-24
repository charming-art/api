import { NULL_VALUE } from "./constant.js";
import { normalizeColor } from "../color.js";

function encodeColor(color) {
  if (color === NULL_VALUE || color === null) return NULL_VALUE;
  const [r, g, b] = normalizeColor(color);
  return b + (g << 8) + (r << 16);
}

function encodeChar(ch) {
  if (Array.isArray(ch)) return ch;
  return Array.from(ch)
    .slice(0, 2)
    .map((ch) => ch.codePointAt(0));
}

function cfb(color) {
  const { ch = " ", fg = "#000", bg = null } = color;
  const [n, n1 = NULL_VALUE] = encodeChar(ch);
  return [n, n1, encodeColor(fg), encodeColor(bg)];
}

export function terminal$point({ x, y, stroke }) {
  if (!stroke) this._backend.noStroke();
  const { ch, fg = "#fff", bg = null } = stroke;
  this._backend.stroke(...cfb({ ch, fg, bg }));
  this._backend.point(x, y);
}
