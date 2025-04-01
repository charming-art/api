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

    for (const {duration, ease, delay, ...attr} of keyframes) {
      transition = transition.transition();
      transition
        .duration(duration)
        .call((t) => ease && t.ease(ease))
        .call((t) => delay && t.delay(delay));
      for (const key in attr) {
        if (key.startsWith("style")) {
          const style = key.slice(5).toLowerCase();
          transition.style(style, attr[key]);
        } else transition.attr(key, attr[key]);
      }
    }

    return node;
  },
};

// More props: https://genji-md.dev/reference/props
const props = {
  Theme: DefaultTheme,
  library: {cm: {...cm, ...extended}},
  transform: {
    module(code) {
      let newCode = code
        .replace("import {", "const {")
        .replace(`from "charmingjs"`, "= cm")
        .replace(`"#root"`, `__root__`);
      return `(() => {
        const __root__ = document.createElement("div");
        ${newCode}
        return __root__;
      })()`;
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
