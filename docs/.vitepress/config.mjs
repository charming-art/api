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
      {text: "Home", link: "/"},
      {
        text: "Examples",
        link: "https://observablehq.com/d/18b3d6f3affff5bb",
      },
    ],
    sidebar: [
      {
        text: "Introduction",
        items: [
          {text: "What is Charming?", link: "/what-is-charming"},
          {text: "Getting started", link: "/getting-started"},
          {text: "API Index", link: "/api-index"},
        ],
      },
      {
        text: "Reference",
        items: [
          {text: "Charming Shape", link: "/charming-shape"},
          {text: "Charming Flow", link: "/charming-flow"},
        ],
      },
    ],
    socialLinks: [{icon: "github", link: "https://github.com/charming-art/charming"}],
    logo: "/logo.svg",
  },
});
