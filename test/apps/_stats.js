import Stats from "stats.js";

export function stats(app) {
  let stats;

  app
    .on("beforeAll", () => {
      const container = document.getElementById("tool");
      stats = new Stats();
      stats.dom.style.position = "inherit";
      stats.dom.style.marginLeft = "1em";
      container.appendChild(stats.dom);
    })
    .on("beforeEach", () => {
      stats.begin();
    })
    .on("afterEach", () => {
      stats.end();
    })
    .on("afterAll", () => {
      stats.dom.remove();
    });
}
