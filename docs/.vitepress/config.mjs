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
        items: [
          {
            text: "Gallery",
            link: "https://observablehq.com/d/7d44ce51bb2199d2",
          },
          {
            text: "The Code of Music",
            link: "https://observablehq.com/d/18b3d6f3affff5bb",
          },
          {
            text: "The Nature of Code",
            link: "https://observablehq.com/d/e2d520e57e529fc0",
          },
        ],
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
          {text: "Charming DOM", link: "/charming-dom"},
          {text: "Charming Flow", link: "/charming-flow"},
          {text: "Charming Vector", link: "/charming-vector"},
          {text: "Charming Transition", link: "/charming-transition"},
        ],
      },
    ],
    socialLinks: [{icon: "github", link: "https://github.com/charming-art/charming"}],
    logo: "/logo.svg",
  },
});
