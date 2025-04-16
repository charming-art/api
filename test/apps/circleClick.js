import * as cm from "../../src/index.js";

export function circleClick() {
  const state = cm.state({clicked: false});

  const svg = cm.svg("svg", {
    width: 100,
    height: 100,
    styleBackground: "black",
    children: () => [
      cm.svg("circle", {
        cx: 50,
        cy: 50,
        r: 40,
        fill: state.clicked ? "red" : "white",
        styleCursor: "pointer",
        onClick: () => (state.clicked = !state.clicked),
      }),
    ],
  });

  return svg.render();
}

circleClick.skip = true;
