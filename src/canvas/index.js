import { color as d3Color } from "d3-color";
import { context2d } from "../context.js";

function normalizeColor(color, opacity) {
  if (color === undefined || opacity === undefined) return color;
  const { r, g, b } = d3Color(color);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function canvas$node() {
  return this._context.canvas;
}

function canvas$circle({ stroke, strokeWidth, fill, x, y, r, fillOpacity, strokeOpacity }) {
  const context = this._context;
  stroke = normalizeColor(stroke, strokeOpacity);
  fill = normalizeColor(fill, fillOpacity);
  context.save();
  context.beginPath();
  if (stroke) context.strokeStyle = stroke;
  if (strokeWidth) context.lineWidth = strokeWidth;
  context.fillStyle = fill;
  context.arc(x, y, r, 0, Math.PI * 2);
  context.fill();
  if (stroke) context.stroke();
  context.closePath();
  context.restore();
  return this;
}

function canvas$rect({ stroke, fill, x, y, width, height, rotate, anchor, fillOpacity, strokeOpacity, strokeWidth }) {
  if (anchor === "center") {
    x = x - width / 2;
    y = y - height / 2;
  }
  stroke = normalizeColor(stroke, strokeOpacity);
  fill = normalizeColor(fill, fillOpacity);
  const context = this._context;
  context.save();
  context.translate(x + width / 2, y + height / 2);
  if (rotate) context.rotate(rotate);
  context.beginPath();
  if (stroke) context.strokeStyle = stroke;
  if (strokeWidth) context.lineWidth = strokeWidth;
  context.fillStyle = fill;
  context.rect(-width / 2, -height / 2, width, height);
  context.fill();
  if (stroke) context.stroke();
  context.closePath();
  context.restore();
  return this;
}

function canvas$line({ stroke, strokeWidth, x, y, x1, y1, rotate, transformOrigin = "start" }) {
  const context = this._context;
  context.save();
  context.beginPath();

  if (rotate) {
    const [mx, my] =
      transformOrigin === "center" ? [(x + x1) / 2, (y + y1) / 2] : transformOrigin === "end" ? [x1, y1] : [x, y];
    context.translate(mx, my);
    context.rotate(rotate);
    context.translate(-mx, -my);
  }

  if (stroke) context.strokeStyle = stroke;
  if (strokeWidth) context.lineWidth = strokeWidth;
  context.moveTo(x, y);
  context.lineTo(x1, y1);
  if (stroke) context.stroke();
  context.closePath();
  context.restore();
  return this;
}

function canvas$triangle({ x, y, x1, y1, x2, y2, fill, stroke, strokeWidth, rotate, translateX, translateY }) {
  const context = this._context;
  context.save();
  if (translateX || translateY) context.translate(translateX, translateY);
  if (rotate) context.rotate(rotate);
  context.beginPath();
  if (stroke) context.strokeStyle = stroke;
  if (strokeWidth) context.lineWidth = strokeWidth;
  context.fillStyle = fill;
  context.moveTo(x, y);
  context.lineTo(x1, y1);
  context.lineTo(x2, y2);
  context.closePath();
  context.fill();
  if (stroke) context.stroke();
  context.restore();
  return this;
}

// @TODO More command.
function canvas$path({ x = 0, y = 0, d, stroke = "#000", strokeOpacity, fill, fillOpacity, strokeWidth }) {
  stroke = normalizeColor(stroke, strokeOpacity);
  fill = normalizeColor(fill, fillOpacity);
  const context = this._context;
  context.save();
  context.strokeStyle = stroke;
  context.translate(x, y);
  if (strokeWidth) context.lineWidth = strokeWidth;
  if (fill) context.fillStyle = fill;
  context.beginPath();
  for (const [type, ...params] of d) {
    if (type === "M") context.moveTo(...params);
    else if (type === "L") context.lineTo(...params);
  }
  if (fill) context.fill();
  if (stroke) context.stroke();
  context.restore();
  return this;
}

function canvas$text({
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
  stroke = normalizeColor(stroke, strokeOpacity);
  fill = normalizeColor(fill, fillOpacity);
  const context = this._context;
  context.save();
  if (stroke) context.strokeStyle = stroke;
  if (strokeWidth) context.lineWidth = strokeWidth;
  if (fill) context.fill = fill;
  if (textAlign) context.textAlign = textAlign;
  if (textBaseline) context.textBaseline = textBaseline;
  context.font = `${fontWeight} ${fontSize}px ${fontFamily ?? ""}`.trim();
  context.fillText(text, x, y);
  context.restore();
}

function canvas$clear({ fill }) {
  this._context.fillStyle = fill;
  this._context.fillRect(0, 0, this._props.width, this._props.height);
  return this;
}

function canvas$polygon({ x: X, y: Y, fill, stroke, strokeWidth, fillOpacity, strokeOpacity }) {
  stroke = normalizeColor(stroke, strokeOpacity);
  fill = normalizeColor(fill, fillOpacity);
  const context = this._context;
  context.save();
  context.beginPath();
  if (stroke) context.strokeStyle = stroke;
  if (strokeWidth) context.lineWidth = strokeWidth;
  context.fillStyle = fill;
  const x0 = X[0];
  const y0 = Y[0];
  context.moveTo(x0, y0);
  for (let i = 1; i < X.length; i++) {
    const x = X[i];
    const y = Y[i];
    context.lineTo(x, y);
  }
  context.closePath();
  context.fill();
  if (stroke) context.stroke();
  context.restore();
  return this;
}

function canvas$mousemove(listener) {
  const node = this.node();
  if (arguments.length === 0) {
    node.removeEventListener("mousemove", this._mousemove);
  }
  this._mousemove = (e) => {
    const { x, y } = node.getBoundingClientRect();
    const { clientX, clientY } = e;
    const dx = clientX - x;
    const dy = clientY - y;
    listener({ x: dx, y: dy });
  };
  node.addEventListener("mousemove", this._mousemove);
  return this;
}

function canvas$mouseup(listener) {
  const node = this.node();
  if (arguments.length === 0) {
    node.removeEventListener("mouseup", this._mouseup);
  }
  this._mouseup = (e) => listener(e);
  node.addEventListener("mouseup", this._mouseup);
  return this;
}

function canvas$mousedown(listener) {
  const node = this.node();
  if (arguments.length === 0) {
    node.removeEventListener("mousedown", this._mousedown);
  }
  this._mousedown = (e) => listener(e);
  node.addEventListener("mousedown", this._mousedown);
  return this;
}

function canvas$mouseclick(listener) {
  const node = this.node();
  if (arguments.length === 0) {
    node.removeEventListener("click", this._mouseclick);
  }
  this._mouseclick = (e) => listener(e);
  node.addEventListener("click", this._mouseclick);
  return this;
}

function canvas$translate(x, y) {
  this._context.translate(x, y);
}

function canvas$save() {
  this._context.save();
}

function canvas$restore() {
  this._context.restore();
}

function canvas$rotate(angle) {
  this._context.rotate(angle);
}

function canvas$init({ width, height, dpi }) {
  const context = context2d(width, height, dpi);
  Object.assign(this, { _context: context });
  Object.assign(this._props, { width, height });
  return this;
}

function Canvas() {
  Object.defineProperties(this, {
    _context: { value: null, writable: true },
    _props: { value: {}, writable: true },
    _mousemove: { value: null, writable: true },
    _mousedown: { value: null, writable: true },
    _mouseup: { value: null, writable: true },
  });
}

Object.defineProperties(Canvas.prototype, {
  init: { value: canvas$init },
  node: { value: canvas$node },
  circle: { value: canvas$circle },
  rect: { value: canvas$rect },
  line: { value: canvas$line },
  triangle: { value: canvas$triangle },
  path: { value: canvas$path },
  polygon: { value: canvas$polygon },
  text: { value: canvas$text },
  clear: { value: canvas$clear },
  mousemove: { value: canvas$mousemove },
  mouseup: { value: canvas$mouseup },
  mousedown: { value: canvas$mousedown },
  mouseclick: { value: canvas$mouseclick },
  translate: { value: canvas$translate },
  rotate: { value: canvas$rotate },
  save: { value: canvas$save },
  restore: { value: canvas$restore },
});

export function canvas(options) {
  return new Canvas(options);
}
