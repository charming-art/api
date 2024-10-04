import DefaultTheme from "vitepress/theme";
import Layout from "genji-theme-vitepress";
import { h } from "vue";
import "../../../dist/charming.umd.min.js";

// More props: https://genji-md.dev/reference/props
const props = {
  Theme: DefaultTheme,
};

export default {
  extends: DefaultTheme,
  Layout: () => h(Layout, props),
};
