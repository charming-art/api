import { defineConfig } from "vitepress";
import config from "genji-theme-vitepress/config";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Charming",
  description: "The JavaScript library for expressive creative coding",
  cleanUrls: true,
  extends: config,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Examples",
        items: [
          { text: "Flow", link: "https://observablehq.com/d/2f9bf9f52cb24090" },
          { text: "Cell", link: "https://observablehq.com/d/18b3d6f3affff5bb" },
        ],
      },
    ],
    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "What is Charming?", link: "/what-is-charming" },
          { text: "Getting started", link: "/getting-started" },
        ],
      },
      {
        text: "Flow",
        link: "/flow",
        items: [
          { text: "What is Flow?", link: "/flow/what-is-flow" },
          { text: "Getting started", link: "/flow/getting-started" },
        ],
      },
      {
        text: "Cell",
        link: "/cell",
        items: [
          { text: "What is Cell?", link: "/cell/what-is-cell" },
          { text: "Getting started", link: "/cell/getting-started" },
        ],
      },
      {
        text: "Lodash",
        link: "/lodash",
        items: [
          { text: "What is Lodash?", link: "/lodash/what-is-lodash" },
          { text: "Getting started", link: "/lodash/getting-started" },
        ],
      },
      {
        text: "API Index",
        link: "/api-index",
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/charming-art/charming" },
    ],
  },
});
