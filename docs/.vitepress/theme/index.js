import DefaultTheme from "vitepress/theme";
import Layout from "genji-theme-vitepress";
import {h} from "vue";
import * as cm from "../../../src/index.js";
import "./custom.css";

// More props: https://genji-md.dev/reference/props
const props = {
  Theme: DefaultTheme,
  library: {cm},
  transform: {
    module(code) {
      const lines = code.split("\n");
      lines.pop();
      lines.shift();
      lines.unshift("const {$, reactive, shape} = cm;");
      lines.push("return svg;");
      const newCode = lines.join("\n");
      return `(() => {${newCode}})()`;
    },
  },
};

export default {
  extends: DefaultTheme,
  Layout: () => h(Layout, props),
};
