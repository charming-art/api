import DefaultTheme from "vitepress/theme";
import Layout from "genji-theme-vitepress";
import {h} from "vue";
import {selectAll} from "d3-selection";
import "d3-transition";
import * as cm from "../../../src/index.js";
import "./custom.css";

// More props: https://genji-md.dev/reference/props
const props = {
  Theme: DefaultTheme,
  library: {cm},
  transform: {
    module(code) {
      const newCode = code.replace(`cm.render`, `return cm.render`);
      const result = `(() => {
        ${newCode}
      })()`;
      return result;
    },
  },
};

export default {
  extends: DefaultTheme,
  Layout: () => h(Layout, props),
};
