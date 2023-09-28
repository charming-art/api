function canvas$size(width, height, dpi = null) {
  if (dpi == null) dpi = devicePixelRatio;
  this._width = width;
  this._height = height;
  const { _canvas: canvas, _context: context } = this;
  canvas.width = width * dpi;
  canvas.height = height * dpi;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  context.scale(dpi, dpi);
  return this;
}

function canvas$node() {
  return this._canvas;
}

function canvas$circle({ stroke, strokeWidth, fill, x, y, r }) {
  const context = this._context;
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

function canvas$rect({ stroke, fill, x, y, width, height, rotate }) {
  const context = this._context;
  context.save();
  context.translate(x + width / 2, y + height / 2);
  if (rotate) context.rotate(rotate);
  context.beginPath();
  if (stroke) context.strokeStyle = stroke;
  context.fillStyle = fill;
  context.rect(-width / 2, -height / 2, width, height);
  context.fill();
  if (stroke) context.stroke();
  context.closePath();
  context.restore();
  return this;
}

function canvas$line({ stroke, strokeWidth, x, y, x1, y1 }) {
  const context = this._context;
  context.save();
  context.beginPath();
  if (stroke) context.strokeStyle = stroke;
  if (strokeWidth) context.lineWidth = strokeWidth;
  context.moveTo(x, y);
  context.lineTo(x1, y1);
  if (stroke) context.stroke();
  context.closePath();
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

function canvas$width() {
  return this._width;
}

function canvas$height() {
  return this._height;
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

function Canvas({ document = window.document } = {}) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  Object.defineProperties(this, {
    _canvas: { value: canvas },
    _context: { value: context },
    _width: { value: 0, writable: true },
    _height: { value: 0, writable: true },
    _mousemove: { value: null, writable: true },
  });
}

Object.defineProperties(Canvas.prototype, {
  size: { value: canvas$size },
  node: { value: canvas$node },
  circle: { value: canvas$circle },
  rect: { value: canvas$rect },
  line: { value: canvas$line },
  width: { value: canvas$width },
  height: { value: canvas$height },
  mousemove: { value: canvas$mousemove },
  translate: { value: canvas$translate },
  rotate: { value: canvas$rotate },
  save: { value: canvas$save },
  restore: { value: canvas$restore },
});

export function canvas(options) {
  return new Canvas(options);
}
