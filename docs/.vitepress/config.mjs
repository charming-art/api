import {defineConfig} from "vitepress";
import config from "genji-theme-vitepress/config";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Charming",
  description: "The JavaScript library for expressive creative coding",
  cleanUrls: true,
  extends: config,
  base: "/api/",
  head: [["link", {rel: "icon", type: "image/png", href: "/logo.png"}]],
  appearance: false,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "Examples",
        link: "https://observablehq.com/d/18b3d6f3affff5bb",
      },
    ],
    sidebar: {},
    socialLinks: [{icon: "github", link: "https://github.com/charming-art/charming"}],
    logo: "/logo.svg",
    outline: "deep",
  },
});
