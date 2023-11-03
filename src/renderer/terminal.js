import { rgb } from "d3-color";
import init, { Backend } from "../backend/index.js";
import { context2d } from "./context.js";
import wasm from "../backend/index_bg.wasm";

// For vite env.
const isNode = typeof navigator === "undefined" ? true : false;

const userAgent = isNode ? "node" : navigator.userAgent;

const isFireFox = userAgent.includes("Firefox");

const isLegacyEdge = userAgent.includes("Edge");

export const TERMINAL_CLASS = "charming-terminal";

export const NULL_VALUE = 0xffffffff;

export const CELL_SIZE = 4;

// https://github.com/xtermjs/xterm.js/blob/096fe171356fc9519e0a6b737a98ca82d0587e91/src/browser/renderer/shared/Constants.ts#LL14C1-L14C1
export const TEXT_BASELINE =
  isFireFox || isLegacyEdge ? "bottom" : "ideographic";

function measureText(text, styles) {
  const span = document.createElement("span");

  // Hide span.
  span.style.visibility = "hidden";
  span.style.position = "absolute";
  span.style.display = "inline-block";
  span.style.left = "-9999em";
  span.style.top = "0";
  span.style.lineHeight = "normal";
  span.setAttribute("aria-hidden", true);

  // Font attributes.
  span.style.fontSize = `${styles.fontSize}px`;
  span.style.fontFamily = styles.fontFamily;

  span.innerHTML = text;
  document.body.appendChild(span);

  const bbox = span.getBoundingClientRect();
  return { width: bbox.width, height: Math.ceil(bbox.height) };
}

function dimensionOf(count, pixel, unit) {
  if (count === undefined) return (pixel / unit) | 0;
  return count;
}

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

function encodeColor(color) {
  if (color === NULL_VALUE || color === null) return NULL_VALUE;
  const { r, g, b } = rgb(color);
  return b + (g << 8) + (r << 16);
}

function encodeChar(ch) {
  if (Array.isArray(ch)) return ch;
  return Array.from(ch)
    .slice(0, 2)
    .map((ch) => ch.codePointAt(0));
}

function cfb(color) {
  const { ch, fg = "#000", bg = null } = color;
  const [n, n1 = NULL_VALUE] = encodeChar(ch);
  return [n, n1, encodeColor(fg), encodeColor(bg)];
}

function terminal$node() {
  return this._context.canvas;
}

function terminal$translate(x, y) {
  this._backend.translate(x, y);
}

function terminal$scale(x, y) {
  this._backend.scale(x, y);
  return this;
}

function terminal$save() {
  this._backend.pushMatrix();
}

function terminal$restore() {
  this._backend.popMatrix();
}

function terminal$rotate(angle) {
  this._context.rotate(angle);
}

function terminal$point({ x, y, stroke }) {
  if (!stroke) this._backend.noStroke();
  const { ch, fg = "#fff", bg = null } = stroke;
  this._backend.stroke(...cfb({ ch, fg, bg }));
  this._backend.point(x, y);
}

function terminal$clear({ fill = "#000" }) {
  this._context.fillStyle = fill;
  this._context.fillRect(0, 0, this._props.width, this._props.height);
}

function terminal$char(char, i, j, fg, bg, wide = false) {
  const {
    cols,
    mode,
    cellWidth,
    cellHeight,
    fontWeight,
    fontSize,
    fontFamily,
  } = this._props;

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

export function terminal$render() {
  const bufferPtr = this._backend.render();
  const { cols, rows } = this._props;
  const buffer = new Uint32Array(
    this._memory.buffer,
    bufferPtr,
    cols * rows * CELL_SIZE
  );
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

function terminal$toString() {
  let string = "";
  for (let j = 0; j < this._rows; j++) {
    if (j !== 0) string += "\n";
    for (let i = 0; i < this._cols; i++) {
      const index = (this._cols * j + i) * CELL_SIZE;
      const empty = this._mode === "double" ? "··" : "·";
      const char = this._buffer[index] || empty;
      string += char;
    }
  }
  return string;
}

// Default options from: https://github.com/xtermjs/xterm.js/blob/ac0207bf2e8a923d0cff95cc383f6f3e36a2e923/src/common/services/OptionsService.ts#LL12C1-L12C1
function terminal$init({
  width,
  height,
  mode = "single",
  cols = mode === "single" ? 80 : 40,
  rows = 24,
  fontFamily = "courier-new, courier, monospace",
  fontSize = 15,
  fontWeight = "normal",
} = {}) {
  const { width: tw, height: th } = measureText("W", {
    fontSize,
    fontFamily,
    fontWeight,
  });
  const cellWidth = mode === "double" ? tw * 2 : tw;
  const cellHeight = th;
  const computedCols = dimensionOf(cols, width, cellWidth);
  const computedRows = dimensionOf(rows, height, cellHeight);
  const computedWidth = computedCols * cellWidth;
  const computedHeight = computedRows * cellHeight;
  const context = context2d(computedWidth, computedHeight);
  const buffer = Array.from(
    { length: computedCols * computedRows },
    () => null
  );
  context.canvas.classList.add(TERMINAL_CLASS);
  const backend = Backend.new(computedCols, computedRows);
  Object.assign(this._props, {
    mode,
    cellWidth,
    cellHeight,
    fontSize,
    fontFamily,
    fontWeight,
    cols: computedCols,
    rows: computedRows,
    width: computedWidth,
    height: computedHeight,
  });
  Object.assign(this, {
    _buffer: buffer,
    _context: context,
    _backend: backend,
  });
  this.clear({ fill: "#000" });
  return this;
}

function Terminal(memory) {
  Object.defineProperties(this, {
    _memory: { value: memory },
    _props: { value: {}, writable: true },
    _buffer: { value: null, writable: true },
    _context: { value: null, writable: true },
    _backend: { value: null, writable: true },
  });
}

Object.defineProperties(Terminal.prototype, {
  init: { value: terminal$init },
  node: { value: terminal$node },
  char: { value: terminal$char },
  render: { value: terminal$render },
  point: { value: terminal$point },
  clear: { value: terminal$clear },
  save: { value: terminal$save },
  restore: { value: terminal$restore },
  rotate: { value: terminal$rotate },
  scale: { value: terminal$scale },
  translate: { value: terminal$translate },
  toString: { value: terminal$toString },
});

export async function terminal() {
  const module = await init(
    typeof wasm === "function" ? await wasm() : undefined
  );
  const { memory } = module;
  return new Terminal(memory);
}
