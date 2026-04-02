/**
 * jsdom has no real Canvas 2D. Pretext measures text via `getMeasureContext()` which uses
 * OffscreenCanvas or `document.createElement("canvas").getContext("2d")`.
 * This shim provides a deterministic `measureText` so `prepare` / `prepareWithSegments` run in tests.
 */
function createMock2dContext() {
  return {
    _font: "",
    set font(v) {
      this._font = v;
    },
    get font() {
      return this._font;
    },
    measureText(s) {
      return {width: Math.max(0, [...s].length * 8)};
    },
  };
}

// Prefer the DOM canvas branch so one mock covers `getContext("2d")`.
if (typeof globalThis.OffscreenCanvas !== "undefined") {
  delete globalThis.OffscreenCanvas;
}

if (typeof HTMLCanvasElement !== "undefined") {
  const orig = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (type, ...args) {
    if (type === "2d") {
      return createMock2dContext();
    }
    return orig.apply(this, [type, ...args]);
  };
}
