import {html, tag, svg, attr} from "../src/index.js";

export function strictNull() {
  return svg();
}

export function strictString() {
  return svg(1);
}

export function setAttr() {
  const node = svg("svg");
  attr(node, "width", 100);
  attr(node, "height", 200);
  attr(node, "style-font-size", "100px");
  attr(node, "style-stroke-width", 2);
  return node;
}

export function setAttributes() {
  return svg("svg", {
    width: 100,
    height: 200,
  });
}

export function setSnakeCaseAttributes() {
  return svg("svg", {
    font_size: 100,
    stroke_width: 2,
  });
}

export function setKebabCaseAttributes() {
  return svg("svg", {
    "font-size": 100,
    "stroke-width": 2,
  });
}

export function setTextContent() {
  return svg("svg", {
    textContent: "hello",
  });
}

export function setInnerHTML() {
  return svg("svg", {
    innerHTML: "<g><text>hello</text></g>",
  });
}

export function setStyle() {
  return svg("svg", {
    style_font_size: "100px",
    style_stroke_width: 2,
  });
}

export function setFunctionAttributes() {
  return svg("svg", {
    width: () => 100,
    height: () => 200,
  });
}

export function setChildren() {
  return svg("svg", {
    children: [
      svg("g"),
      svg("text", {
        textContent: "hello",
      }),
    ],
  });
}

export function setZeroChildren() {
  return html("div", {
    children: [0],
  });
}

export function setFalsyChildren() {
  return svg("svg", [
    svg("g"),
    null,
    false,
    undefined,
    svg("text", {
      textContent: "hello",
    }),
  ]);
}

export function setNonMarkChildren() {
  return html("div", ["hello", html("span", ["world"]), {key: "foo"}]);
}

export function setDataDrivenNonMarkChildren() {
  return html("div", [
    svg("span", {
      data: [1, 2, 3],
      textContent: ({d, i}) => `${i}-${d}`,
    }),
  ]);
}

export function setDataDrivenAttributes() {
  return svg("svg", {
    width: 100,
    height: 100,
    children: [
      svg("circle", {
        data: [1, 2, 3],
        cx: ({d}) => d * 20,
        cy: 50,
        r: 10,
      }),
    ],
  });
}

export function setListChildren() {
  return svg("svg", {
    width: 100,
    height: 100,
    children: [1, 2, 3].map((d) => svg("circle", {r: d})),
  });
}

export function setNestedListChildren() {
  return svg("svg", {
    width: 100,
    height: 100,
    children: [[1, 2, 3].map((d) => svg("circle", {r: d}))],
  });
}

export function setDataDrivenChildren() {
  return svg("svg", {
    width: 100,
    height: 100,
    children: [
      svg("g", {
        data: [1, 2, 3],
        children: [
          svg("circle", {
            cx: ({d}) => d * 20,
            cy: 50,
            r: 10,
          }),
        ],
      }),
    ],
  });
}

export function setDataDrivenChildrenWithoutOptions() {
  return svg("svg", {
    width: 100,
    height: 100,
    children: [svg("g", {data: [1, 2, 3]})],
  });
}

export function setNestedChildren() {
  return svg("svg", {
    width: 100,
    height: 100,
    children: [
      svg("g", {
        data: [1, 2, 3],
        children: [
          svg("g", {
            children: [
              svg("circle", {
                cx: ({d}) => d * 20,
                cy: 50,
                r: 10,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

export function setNestedDataDrivenChildren() {
  return svg("svg", {
    width: 100,
    height: 100,
    children: [
      svg("g", {
        data: [1, 2, 3],
        children: [
          svg("g", {
            data: [4, 5],
            children: [
              svg("circle", {
                cx: ({d}) => d * 5,
                cy: 50,
                r: 10,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

export function setTable() {
  const table = [
    [11975, 5871, 8916, 2868],
    [1951, 10048, 2060, 6171],
    [8010, 16145, 8090, 8045],
    [1013, 990, 940, 6907],
  ];
  return html("table", [
    html("tr", {
      data: table,
      children: [
        html("td", {
          data: ({d}) => d,
          textContent: ({d}) => d,
        }),
      ],
    }),
  ]);
}

export function setNestedCallbackDataDrivenChildren() {
  return svg("svg", {
    width: 100,
    height: 100,
    children: [
      svg("g", {
        data: [1, 2, 3],
        children: [
          svg("g", {
            data: ({d}) => Array.from({length: d}, (_, i) => i),
            children: [svg("circle", {r: 10, cx: ({d}) => d * 5, cy: 50})],
          }),
        ],
      }),
    ],
  });
}

export function cloneDataDrivenChildren() {
  return svg("svg", {
    width: 100,
    height: 100,
    children: [
      svg("g", {
        data: [1, 2, 3],
        transform: ({d}) => `translate(${d * 20}, 50)`,
        children: [
          svg("circle", {
            r: 10,
          }),
        ],
      }),
    ],
  });
}

export function fragmentRoot() {
  return svg("circle", {
    data: [1, 2, 3],
    cx: ({d}) => d * 20,
    cy: 50,
    r: 10,
  });
}

export function htmlAttributes() {
  return html("div", {
    className: "hello",
    disabled: true,
    checked: true,
    selected: true,
    readOnly: true,
    hidden: true,
    placeholder: "hello",
    title: "hello",
    alt: "hello",
    href: "https://charmingjs.org",
    src: "https://charmingjs.org",
  });
}

export function mathXL() {
  const math = tag("http://www.w3.org/1998/Math/MathML");
  return math("math", {
    children: [
      math("mrow", {
        children: [
          math("mrow", [
            math("mi", {textContent: "x"}),
            math("mo", {textContent: "∗"}),
            math("mn", {textContent: "2"}),
          ]),
          math("mo", {textContent: "+"}),
          math("mi", {textContent: "y"}),
        ],
      }),
    ],
  });
}

export function setCallbackChildren() {
  return svg("g", {
    data: [0, 1, 2],
    transform: ({d}) => `translate(${(d + 1) * 50}, 0)`,
    children: [
      ({d, i, data}) => {
        const a = d + i + data.length;
        return svg("circle", {
          r: 20,
          cy: 30,
          fill: `rgb(${a}, ${a}, ${a})`,
        });
      },
    ],
  });
}

export function setDataChildrenStringNodes() {
  return svg("svg", [
    svg("g", {
      data: [1, 2, 3],
      children: ["hello"],
    }),
  ]);
}
