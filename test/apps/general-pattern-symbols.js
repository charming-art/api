import * as cm from "../../src/index.js";
import { dispose } from "../utils/dispose.js";

function circle(context, size) {
  const r = size / 2;
  context.moveTo(r, 0);
  context.arc(0, 0, r, 0, Math.PI * 2);
}

function cross(context, size) {
  const r = size / 6;
  context.moveTo(-3 * r, -r);
  context.lineTo(-r, -r);
  context.lineTo(-r, -3 * r);
  context.lineTo(r, -3 * r);
  context.lineTo(r, -r);
  context.lineTo(3 * r, -r);
  context.lineTo(3 * r, r);
  context.lineTo(r, r);
  context.lineTo(r, 3 * r);
  context.lineTo(-r, 3 * r);
  context.lineTo(-r, r);
  context.lineTo(-3 * r, r);
  context.closePath();
}

function square(context, size) {
  const x = -size / 2;
  context.rect(x, x, size, size);
}

function triangle(context, size) {
  const y = size / 2;
  const x = size / 2;
  context.moveTo(0, -y);
  context.lineTo(x, y);
  context.lineTo(-x, y);
  context.closePath();
}

function createMatrix(scale, rotation = 0) {
  const radian = (rotation * Math.PI) / 180;
  const matrix = {
    a: Math.cos(radian) * scale,
    b: Math.sin(radian) * scale,
    c: -Math.sin(radian) * scale,
    d: Math.cos(radian) * scale,
    e: 0,
    f: 0,
  };
  return matrix;
}

function pattern(patternElement) {
  const id = patternElement.match(/id="([^"]+)"/)[1];
  const width = patternElement.match(/width="([^"]+)"/)[1] ?? 100;
  const height = patternElement.match(/height="([^"]+)"/)[1] ?? 100;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const image = new Image();
  const svgContent = `
    <svg viewBox="0 0 ${width / 2} ${
      height / 2
    }" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        ${patternElement}
        <rect x="0" fill="url(#${id})" width="100%" height="100%"/>
    </svg>`;
  image.src = "data:image/svg+xml," + encodeURIComponent(svgContent);
  return new Promise((resolve) => {
    image.onload = () => {
      const pattern = context.createPattern(image, "repeat");
      const matrix = createMatrix(0.5);
      pattern.setTransform(matrix);
      resolve(pattern);
    };
  });
}

export async function generalPatternSymbols() {
  const size = 640;
  const n = 2;
  const cellSize = 640 / n;
  const symbols = [circle, cross, square, triangle];
  const fill = await pattern(
    '<pattern id="diverging-12514031-1" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse" patternTransform="translate(50.69 51.86)"><rect fill="none" width="100" height="100"/><line style="stroke:#5d6a9a;stroke-miterlimit:10;stroke-width:2px;fill:none" x1="53.03" y1="-53.03" x2="-53.03" y2="53.03"/><line style="stroke:#5d6a9a;stroke-miterlimit:10;stroke-width:2px;fill:none" x1="61.37" y1="-44.7" x2="-44.7" y2="61.37"/><line style="stroke:#5d6a9a;stroke-miterlimit:10;stroke-width:2px;fill:none" x1="69.7" y1="-36.37" x2="-36.37" y2="69.7"/><line style="stroke:#5d6a9a;stroke-miterlimit:10;stroke-width:2px;fill:none" x1="78.03" y1="-28.03" x2="-28.03" y2="78.03"/><line style="stroke:#5d6a9a;stroke-miterlimit:10;stroke-width:2px;fill:none" x1="86.37" y1="-19.7" x2="-19.7" y2="86.37"/><line style="stroke:#5d6a9a;stroke-miterlimit:10;stroke-width:2px;fill:none" x1="94.7" y1="-11.37" x2="-11.37" y2="94.7"/><line style="stroke:#5d6a9a;stroke-miterlimit:10;stroke-width:2px;fill:none" x1="103.03" y1="-3.03" x2="-3.03" y2="103.03"/><line style="stroke:#5d6a9a;stroke-miterlimit:10;stroke-width:2px;fill:none" x1="111.37" y1="5.3" x2="5.3" y2="111.37"/><line style="stroke:#5d6a9a;stroke-miterlimit:10;stroke-width:2px;fill:none" x1="119.7" y1="13.63" x2="13.63" y2="119.7"/><line style="stroke:#5d6a9a;stroke-miterlimit:10;stroke-width:2px;fill:none" x1="128.03" y1="21.97" x2="21.97" y2="128.03"/><line style="stroke:#5d6a9a;stroke-miterlimit:10;stroke-width:2px;fill:none" x1="136.37" y1="30.3" x2="30.3" y2="136.37"/><line style="stroke:#5d6a9a;stroke-miterlimit:10;stroke-width:2px;fill:none" x1="144.7" y1="38.63" x2="38.63" y2="144.7"/><line style="stroke:#5d6a9a;stroke-miterlimit:10;stroke-width:2px;fill:none" x1="153.03" y1="46.97" x2="46.97" y2="153.03"/></pattern>',
  );

  function draw(app) {
    app
      .data(cm.range(symbols.length))
      .append(cm.group, {
        x: (d) => (d % n) * cellSize + cellSize / 2,
        y: (d) => Math.floor(d / n) * cellSize + cellSize / 2,
      })
      .append(cm.path, {
        d: (i) => {
          const context = cm.pathContext();
          symbols[i](context, cellSize * 0.9);
          return context.toArray();
        },
        fill: fill,
        stroke: "black",
        strokeWidth: 2,
      });
  }

  return cm
    .app({
      width: size,
      height: size,
    })
    .call(draw)
    .call(dispose)
    .render()
    .node();
}
