import { defineConfig } from "vitepress";
import config from "genji-theme-vitepress/config";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Charming",
  description: "The JavaScript library for expressive creative coding",
  cleanUrls: true,
  extends: config,
  head: [["link", { rel: "icon", type: "image/png", href: "/logo.png" }]],
  appearance: false,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "Examples",
        link: "https://observablehq.com/d/18b3d6f3affff5bb",
      },
    ],
    sidebar: [
      {
        text: "Introduction",
        items: [
          {
            text: "What is Charming?",
            link: "/",
          },
          {
            text: "Why Charming?",
            link: "/why-charming",
          },
          {
            text: "Get Started",
            link: "/get-started",
          },
          {
            text: "API Index",
            link: "/api-index",
          },
        ]
      },
      {
        text: "Features",
        items: [
          {
            text: "Charming SVG",
            link: "/svg",
          },
          {
            text: "Charming Canvas",
            link: "/canvas",
          },
        ]
      }
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/charming-art/api" }],
    logo: "/logo.svg",
    outline: "deep",
  },
});
