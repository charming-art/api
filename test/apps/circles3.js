import * as cm from "@charming-art/charming";

export function circles3() {
  return cm.render({
    width: 640,
    height: 640,
    loop: (context) => {
      const mouseX = context.attr("mouseX");
      const mouseY = context.attr("mouseY");
      return cm.group(
        cm.background({fill: "white"}),
        cm.flow(
          cm.range(120),
          cm.map((_, i, data) => (i * Math.PI) / data.length),
          cm.circle({
            x: (t) => Math.cos(t) * Math.cos(t * 3) * 250 + 280,
            y: (t) => Math.sin(t) * Math.cos(t * 3) * 250 + 320,
            r: (i) => i,
          }),
          cm.scale({r: {range: [5, 20]}}),
          cm.scale({
            fill: (data) => {
              const {I, x: X, y: Y, r: R} = data;
              return I.map((i) => {
                const dx = X[i] - mouseX;
                const dy = Y[i] - mouseY;
                const d = Math.sqrt(dx * dx + dy * dy);
                return d < R[i] ? "red" : "black";
              });
            },
          }),
        ),
      );
    },
  });
}
