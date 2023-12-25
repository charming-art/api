import * as cm from "../../src/index.js";
import { dispose } from "../dispose.js";
import { stats } from "../stats.js";

function barX(
  flow,
  {
    x: X,
    y: Y,
    width,
    height,
    step,
    ticks,
    title,
    colors = ["#CC4A6A", "#6EBD41", "#D6B152", "#56ADD3", "#AC5ADA", "#7DDEBB"],
  },
) {
  const [data] = flow.data();
  const scaleX = cm.scaleLinear([0, 2.0], [0, width]);

  // Title.
  flow.datum(0).append(cm.text, {
    text: title,
    x: width / 2,
    y: -1,
    textAlign: "center",
    textBaseline: "bottom",
  });

  // Axis.
  const axis = flow
    .datum(0)
    .append(cm.group, {
      x: 0,
      y: height,
    })
    .data(ticks);

  axis.append(cm.link, {
    x: (d) => scaleX(d),
    x1: (d) => scaleX(d),
    y: 0,
    y1: -height - 1,
    stroke: cm.cfb(":"),
  });

  axis.datum(0).append(cm.link, {
    x: 0,
    x1: width,
    y: 0,
    y1: 0,
    stroke: cm.cfb("-"),
  });

  axis.append(cm.text, {
    text: (d) => (d ? d.toFixed(1) + "" : d),
    textAlign: "center",
    y: 1,
    x: (d) => scaleX(d),
  });

  // Bars.
  flow.data(data).append(cm.rect, {
    x: scaleX(0),
    y: Y.map((y) => y * step),
    width: X.map(scaleX),
    height: step - 1,
    fill: (_, i) => cm.cfb("#", colors[i % colors.length]),
  });
}

export async function terminalBar() {
  const data = [1.9, 1.9, 1.6, 1.0, 0.4, 0.1];

  // Dimensions.
  const step = 3;
  const marginX = 3;
  const marginY = 3;
  const plotWidth = 60;
  const plotHeight = step * data.length;
  const height = plotHeight + marginY * 2;
  const width = plotWidth + marginX * 2;

  const app = cm.app({
    renderer: await cm.terminal(),
    cols: width,
    rows: height,
  });

  // Bar Chart.
  app
    .append(cm.group, { x: marginX, y: marginY })
    .data(data)
    .append(barX, {
      x: (d) => d,
      y: (_, i) => i,
      step: cm.constant(step),
      width: cm.constant(plotWidth),
      height: cm.constant(plotHeight),
      title: cm.constant("Bar Chart, Terminal"),
      ticks: cm.constant([0, 0.5, 1.0, 1.5, 2.0]),
    });

  // Annotation.
  app.append(cm.text, {
    x: marginX + innerWidth,
    y: marginY + innerHeight,
    fontSize: "large",
    text: "2023",
    textBaseline: "bottom",
    textAlign: "left",
  });

  return app.call(dispose).call(stats).render().node();
}
