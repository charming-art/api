import * as cm from "../../src/index.js";
import {renderPretext} from "../helpers.js";

export function pretextCirclePath() {
  const layout = cm.layoutTextInPath({
    text: "AGI 春天到了",
    fontSize: 16,
    fontFamily: "Inter",
    path: cm.pathCircle(200, 150, 100),
  });
  return renderPretext(layout);
}
