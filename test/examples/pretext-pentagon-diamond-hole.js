import * as cm from "../../src/index.js";
import {renderPretext} from "./helper.js";

export function pretextPentagonDiamondHole() {
  const layout = cm.layoutTextInPath({
    text: "AGI 春天到了 · second polygon with a rhombus cutout.",
    fontSize: "18px",
    fontFamily: "Inter",
    path: "M 10 10 L 130 10 L 190 80 L 160 130 L 40 160 Z M 30 85 L 95 125 L 160 85 L 95 45 Z",
  });
  return renderPretext(layout);
}
