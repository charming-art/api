import * as cm from "../../src/index.js";
import {renderPretext} from "./helper.js";

export function pretextCirclePathRotate() {
  const layout = cm.layoutTextInPath({
    text: "AGI 春天到了",
    fontSize: 16,
    fontFamily: "Inter",
    path: cm.pathCircle(200, 200, 100),
    angle: 45,
  });
  return renderPretext(layout);
}
