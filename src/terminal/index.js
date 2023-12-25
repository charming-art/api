import init from "../backend/index.js";
import wasm from "../backend/index_bg.wasm";
import { terminal$init } from "./init.js";
import { terminal$node } from "./node.js";
import { terminal$char } from "./char.js";
import { terminal$render } from "./render.js";
import { terminal$point } from "./point.js";
import { terminal$text } from "./text.js";
import { terminal$rect } from "./rect.js";
import { terminal$line } from "./line.js";
import { terminal$clear } from "./clear.js";
import { terminal$save } from "./save.js";
import { terminal$restore } from "./restore.js";
import { terminal$rotate } from "./rotate.js";
import { terminal$scale } from "./scale.js";
import { terminal$translate } from "./translate.js";
import { terminal$toString } from "./toString.js";
import { terminal$textBBox } from "./textBBox.js";

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
  rect: { value: terminal$rect },
  line: { value: terminal$line },
  text: { value: terminal$text },
  clear: { value: terminal$clear },
  save: { value: terminal$save },
  restore: { value: terminal$restore },
  rotate: { value: terminal$rotate },
  scale: { value: terminal$scale },
  translate: { value: terminal$translate },
  toString: { value: terminal$toString },
  textBBox: { value: terminal$textBBox },
});

export async function terminal() {
  const module = await init(typeof wasm === "function" ? await wasm() : undefined);
  const { memory } = module;
  return new Terminal(memory);
}
