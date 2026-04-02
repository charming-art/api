/**
 * jsdom has no real Canvas 2D. Pretext measures text via `getMeasureContext()` which uses
 * `document.createElement("canvas").getContext("2d")`.
 *
 * Snapshot tests record draw calls on `canvas.__commandList`. `HTMLCanvasElement#toString`
 * turns that into plain lines: `scale, 1, 1` and `fillRect, 0, 0, 100, 100` (newline-separated).
 */
function formatCanvasArg(v) {
  if (typeof v === "string" && !/[,\n]/.test(v)) {
    return v;
  }
  return JSON.stringify(v);
}

function formatCanvasCommandLine(c) {
  if (c.type === "set") {
    return [c.prop, formatCanvasArg(c.value)].join(", ");
  }
  return [c.type, ...c.params.map(formatCanvasArg)].join(", ");
}

function createRecording2dContext(canvas) {
  /** @type {Array<{type: string, params?: unknown[], prop?: string, value?: unknown}>} */
  const commands = [];
  canvas.__commandList = commands;

  const store = Object.create(null);

  function push(type, params = []) {
    commands.push({type, params});
  }

  function pushSet(prop, value) {
    commands.push({type: "set", prop, value});
    store[prop] = value;
  }

  canvas.toString = function canvasCommandListToString() {
    return commands.map(formatCanvasCommandLine).join("\n");
  };

  /** @type {CanvasRenderingContext2D & Record<string, unknown>} */
  const ctx = {
    canvas,

    get fillStyle() {
      return store.fillStyle;
    },
    set fillStyle(v) {
      pushSet("fillStyle", v);
    },
    get strokeStyle() {
      return store.strokeStyle;
    },
    set strokeStyle(v) {
      pushSet("strokeStyle", v);
    },
    get lineWidth() {
      return store.lineWidth;
    },
    set lineWidth(v) {
      pushSet("lineWidth", v);
    },
    get globalAlpha() {
      return store.globalAlpha;
    },
    set globalAlpha(v) {
      pushSet("globalAlpha", v);
    },
    get lineCap() {
      return store.lineCap;
    },
    set lineCap(v) {
      pushSet("lineCap", v);
    },
    get lineJoin() {
      return store.lineJoin;
    },
    set lineJoin(v) {
      pushSet("lineJoin", v);
    },
    get miterLimit() {
      return store.miterLimit;
    },
    set miterLimit(v) {
      pushSet("miterLimit", v);
    },
    get font() {
      return store.font ?? "";
    },
    set font(v) {
      pushSet("font", v);
    },
    get textAlign() {
      return store.textAlign;
    },
    set textAlign(v) {
      pushSet("textAlign", v);
    },
    get textBaseline() {
      return store.textBaseline;
    },
    set textBaseline(v) {
      pushSet("textBaseline", v);
    },

    measureText(s) {
      push("measureText", [s]);
      return {width: Math.max(0, [...String(s)].length * 8)};
    },
  };

  const methods = [
    "scale",
    "beginPath",
    "moveTo",
    "lineTo",
    "arc",
    "ellipse",
    "stroke",
    "fill",
    "fillRect",
    "strokeRect",
    "closePath",
    "rect",
    "clearRect",
    "save",
    "restore",
    "translate",
    "rotate",
    "transform",
    "setTransform",
    "resetTransform",
    "clip",
    "fillText",
    "strokeText",
    "quadraticCurveTo",
    "bezierCurveTo",
    "arcTo",
    "setLineDash",
  ];

  for (const name of methods) {
    ctx[name] = (...args) => {
      push(name, args);
    };
  }

  return ctx;
}

if (typeof globalThis.OffscreenCanvas !== "undefined") {
  delete globalThis.OffscreenCanvas;
}

if (typeof HTMLCanvasElement !== "undefined") {
  const orig = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (type, ...args) {
    if (type === "2d") {
      return createRecording2dContext(this);
    }
    return orig.apply(this, [type, ...args]);
  };
}
