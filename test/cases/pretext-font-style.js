import * as cm from "../../src/index.js";
import {renderPretext} from "../helpers.js";

export function pretextFontStyle() {
  const layout = cm.layoutTextInPath({
    text: "Italic bold · 春天到了",
    fontSize: 17,
    fontFamily: "Inter",
    fontStyle: "italic",
    fontWeight: "700",
    fontVariant: "normal",
    path: cm.pathCircle(200, 200, 95),
  });
  return renderPretext(layout);
}
