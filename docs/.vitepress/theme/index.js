import DefaultTheme from "vitepress/theme";
import Layout from "genji-theme-vitepress";
import {h} from "vue";
import * as cm from "../../../src/index.js";
import "./custom.css";

// More props: https://genji-md.dev/reference/props
const props = {
  Theme: DefaultTheme,
  library: {cm, svg: cm.svg, html: cm.html},
  transform: {
    module(code) {
      let newCode = code
        .replace("import {", "const {")
        .replace(`from "charmingjs"`, "= cm")
        .replace(`document.body.append(node);`, "return node;");
      if (!newCode.includes("return node;")) newCode += "return node;";
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
