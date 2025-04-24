import * as cm from "../../src/index.js";

export function textState() {
  const state = cm.state({count: 0, fill: "steelblue"});

  setTimeout(() => {
    state.count = 0;
  }, 500);

  setTimeout(() => {
    state.count = 1;
    state.fill = "black";
  }, 1000);

  const svg = cm.svg("svg", {
    width: 100,
    height: 100,
    children: () => {
      console.log("update");
      return cm.svg("text", {
        textContent: state.count,
        fill: state.fill,
        dy: "1em",
      });
    },
  });

  return svg.render();
}

textState.skip = true;
