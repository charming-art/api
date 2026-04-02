import * as cm from "../../src/index.js";
import {renderPretext} from "../helpers.js";

export function pretextQuadTriangleHole() {
  const layout = cm.layoutTextInPath({
    text: "AGI 春天到了 · layout along hachure lines inside a path with a hole.",
    fontSize: 12,
    fontFamily: "Inter",
    path: "M 10 10 L 120 10 L 180 80 L 40 160 Z M 30 40 L 60 120 L 90 60 Z",
  });
  return renderPretext(layout);
}
