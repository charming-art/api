import DefaultTheme from "vitepress/theme";
import Layout from "genji-theme-vitepress";
import {h} from "vue";
import {selectAll} from "d3-selection";
import "d3-transition";
import * as cm from "../../../src/index.js";
import "./custom.css";

const extended = {
  random(min, max) {
    return Math.random() * (max - min) + min;
  },
  constrain(x, min, max) {
    return Math.min(Math.max(x, min), max);
  },
  transition(node, props) {
    const {keyframes} = props;
    const selection = selectAll([node]);
    let transition = selection;

    for (const {attr = {}, style = {}, duration, ease, delay} of keyframes) {
      transition = transition.transition();
      transition
        .duration(duration)
        .call((t) => ease && t.ease(ease))
        .call((t) => delay && t.delay(delay));
      for (const key in attr) transition.attr(key, attr[key]);
      for (const key in style) transition.style(key, style[key]);
    }

    return node;
  },
};

// More props: https://genji-md.dev/reference/props
const props = {
  Theme: DefaultTheme,
  library: {cm: {...cm, ...extended}, SVG: cm.SVG, HTML: cm.HTML},
  transform: {
    module(code) {
      let newCode = code
        .replace("import {", "const {")
        .replace(`from "charmingjs"`, "= cm")
        .replace(`document.body.append(app.node());`, "return app.node();");
      return `(() => {${newCode}})()`;
    },
    replayable(code) {
      return `(() => {
        play;
        return ${code};
      })()`;
    },
  },
};

export default {
  extends: DefaultTheme,
  Layout: () => h(Layout, props),
};
