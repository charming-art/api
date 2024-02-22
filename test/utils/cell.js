import * as cm from "../../src/index.js";
import { dispose } from "./dispose.js";
import { frame } from "./frame.js";
import { CLASS_NAME } from "./snapshot.js";

export function cell({ cellWidth = 200, cellHeight = cellWidth, cols = 3, tests = [] }) {
  const rows = (tests.length / cols) | 0;
  const container = document.createElement("div");
  container.style.display = "grid";
  container.style.gridTemplateColumns = `repeat(${cols}, ${cellWidth}px)`;
  container.style.gridTemplateRows = `repeat(${rows}, ${cellHeight}px)`;
  container.style.gap = "8px";
  for (const test of tests) {
    const app = cm.app({ width: cellWidth, height: cellHeight });
    const node = app.call(test, cellWidth, cellHeight).call(dispose).call(frame).render().node();
    container.appendChild(node);
  }
  container.classList.add(CLASS_NAME);
  container.style.width = "fit-content";
  container.style.padding = "8px";
  return container;
}
