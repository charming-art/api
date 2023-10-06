import Stats from "stats.js";

export function stats(app) {
  let stats;

  app
    .beforeAll(() => {
      const container = document.getElementById("tool");
      stats = new Stats();
      stats.dom.style.position = "inherit";
      stats.dom.style.marginLeft = "1em";
      container.appendChild(stats.dom);
    })
    .beforeEach(() => {
      stats.begin();
    })
    .afterEach(() => {
      stats.end();
    })
    .afterAll(() => {
      stats.dom.remove();
    });
}
