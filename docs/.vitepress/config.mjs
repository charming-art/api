import {defineConfig} from "vitepress";
import config from "genji-theme-vitepress/config";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Charming",
  description: "The JavaScript library for expressive creative coding",
  cleanUrls: true,
  extends: config,
  head: [["link", {rel: "icon", type: "image/png", href: "/logo.png"}]],
  appearance: false,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {text: "Docs", link: "/docs/what-is-charming"},
      {
        text: "Examples",
        link: "https://observablehq.com/d/18b3d6f3affff5bb",
      },
    ],
    sidebar: {
      "/": [
        {
          text: "Introduction",
          items: [
            {text: "What is Charming?", link: "/docs/what-is-charming"},
            {text: "Getting started", link: "/docs/getting-started"},
            {text: "API Index", link: "/docs/api-index"},
          ],
        },
        {
          text: "Reference",
          items: [
            {text: "Charming Render", link: "/docs/charming-render"},
            {text: "Charming Vector", link: "/docs/charming-vector"},
            {text: "Charming Transition", link: "/docs/charming-transition"},
          ],
        },
      ],
    },
    socialLinks: [{icon: "github", link: "https://github.com/charming-art/charming"}],
    logo: "/logo.svg",
  },
});
