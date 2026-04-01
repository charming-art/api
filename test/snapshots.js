import * as cm from "../src/index.js";

export function strictNull() {
  return cm.svg``;
}

export function strictString() {
  return cm.svg`1`;
}

export function setAttr() {
  return cm.svg`<svg ${{
    width: 100,
    height: 200,
    style_font_size: "100px",
    style_stroke_width: 2,
  }}/>`;
}

export function setAttributes() {
  return cm.svg`<svg ${{
    width: 100,
    height: 200,
  }}/>`;
}

export function setSnakeCaseAttributes() {
  return cm.svg`<svg ${{
    font_size: 100,
    stroke_width: 2,
  }}/>`;
}

export function setKebabCaseAttributes() {
  return cm.svg`<svg ${{
    "font-size": 100,
    "stroke-width": 2,
  }}/>`;
}

export function setTextContent() {
  return cm.svg`<svg>hello</svg>`;
}

export function setInnerHTML() {
  return cm.svg`<svg><g><text>hello</text></g></svg>`;
}

export function setStyle() {
  return cm.svg`<svg ${{
    style_font_size: "100px",
    style_stroke_width: 2,
  }}/>`;
}

export function setFunctionAttributes() {
  return cm.svg`<svg ${{
    width: () => 100,
    height: () => 200,
  }}/>`;
}

export function setFunctionAttributesWithNode() {
  return cm.svg`<svg ${{
    width: (node) => node.clientWidth,
    height: (node) => node.clientHeight,
  }}/>`;
}

export function setDataDrivenFunctionWithNode() {
  return cm.svg`<circle ${{
    data: [1, 2, 3],
    r: (d, _i, _data, node) => node.clientWidth * d,
  }}/>`;
}

export function setChildren() {
  return cm.svg`<svg><g/><text>hello</text></svg>`;
}

export function setZeroChildren() {
  return cm.html`<div>0</div>`;
}

export function setFalsyChildren() {
  return cm.svg`<svg><g/><text>hello</text></svg>`;
}

export function setNonMarkChildren() {
  return cm.html`<div>hello<span>world</span>{key: "foo"}</div>`;
}

export function setDataDrivenNonMarkChildren() {
  return cm.html`<div>
    <span
      ${{
        data: [1, 2, 3],
        textContent: (d, i) => `${i}-${d}`,
      }}
    />
  </div>`;
}

export function setDataDrivenAttributes() {
  return cm.svg`<svg ${{
    width: 100,
    height: 100,
  }}>
    <circle ${{
      data: [1, 2, 3],
      cx: (d) => d * 20,
      cy: 50,
      r: 10,
    }}/>
  </svg>`;
}

export function setListChildren() {
  return cm.svg`<svg ${{
    width: 100,
    height: 100,
  }}>
    ${[1, 2, 3].map((d) => cm.svg`<circle ${{r: d}}/>`)}
  </svg>`;
}

export function setNestedListChildren() {
  return cm.svg`<svg ${{
    width: 100,
    height: 100,
  }}>
    ${[[1, 2, 3].map((d) => cm.svg`<circle ${{r: d}}/>`)]}
  </svg>`;
}

export function setDataDrivenChildren() {
  return cm.svg`<svg ${{
    width: 100,
    height: 100,
  }}>
    <g ${{
      data: [1, 2, 3],
    }}>
      <circle ${{cx: (d) => d * 20, cy: 50, r: 10}}/>
    </g>
  </svg>`;
}

export function setDataDrivenChildrenWithoutOptions() {
  return cm.svg`<svg ${{
    width: 100,
    height: 100,
  }}>
    <g ${{data: [1, 2, 3]}}/>
  </svg>`;
}

export function setNestedChildren() {
  // return svg("svg", {
  //   width: 100,
  //   height: 100,
  //   children: [
  //     svg("g", {
  //       data: [1, 2, 3],
  //       children: [
  //         svg("g", {
  //           children: [
  //             svg("circle", {
  //               cx: (d) => d * 20,
  //               cy: 50,
  //               r: 10,
  //             }),
  //           ],
  //         }),
  //       ],
  //     }),
  //   ],
  // });
  return cm.svg`<svg ${{
    width: 100,
    height: 100,
  }}>
    <g ${{data: [1, 2, 3]}}>
      <g>
        <circle ${{
          cx: (d) => d * 20,
          cy: 50,
          r: 10,
        }}/>
      </g>
    </g>
  </svg>`;
}

export function setNestedDataDrivenChildren() {
  // return svg("svg", {
  //   width: 100,
  //   height: 100,
  //   children: [
  //     svg("g", {
  //       data: [1, 2, 3],
  //       children: [
  //         svg("g", {
  //           data: [4, 5],
  //           children: [
  //             svg("circle", {
  //               cx: (d) => d * 5,
  //               cy: 50,
  //               r: 10,
  //             }),
  //           ],
  //         }),
  //       ],
  //     }),
  //   ],
  // });
  return cm.svg`<svg ${{
    width: 100,
    height: 100,
  }}>
    <g ${{data: [1, 2, 3]}}>
      <g ${{data: [4, 5]}}>
        <circle ${{
          cx: (d) => d * 5,
          cy: 50,
          r: 10,
        }}/>
      </g>
    </g>
  </svg>`;
}

export function setTable() {
  const table = [
    [11975, 5871, 8916, 2868],
    [1951, 10048, 2060, 6171],
    [8010, 16145, 8090, 8045],
    [1013, 990, 940, 6907],
  ];
  // return html("table", [
  //   html("tr", {
  //     data: table,
  //     children: [
  //       html("td", {
  //         data: (d) => d,
  //         textContent: (d) => d,
  //       }),
  //     ],
  //   }),
  // ]);
  return cm.html`<table>
    <tbody>
      <tr ${{data: table}}>
        <td ${{data: (d) => d, textContent: (d) => d}}/>
      </tr>
    </tbody>
  </table>`;
}

export function setNestedCallbackDataDrivenChildren() {
  // return svg("svg", {
  //   width: 100,
  //   height: 100,
  //   children: [
  //     svg("g", {
  //       data: [1, 2, 3],
  //       children: [
  //         svg("g", {
  //           data: (d) => Array.from({length: d}, (_, i) => i),
  //           children: [svg("circle", {r: 10, cx: (d) => d * 5, cy: 50})],
  //         }),
  //       ],
  //     }),
  //   ],
  // });
  return cm.svg`<svg ${{
    width: 100,
    height: 100,
  }}>
    <g ${{data: [1, 2, 3]}}>
      <g ${{data: (d) => Array.from({length: d}, (_, i) => i)}}>
        <circle ${{r: 10, cx: (d) => d * 5, cy: 50}}/>
      </g>
    </g>
  </svg>`;
}

export function cloneDataDrivenChildren() {
  // return svg("svg", {
  //   width: 100,
  //   height: 100,
  //   children: [
  //     svg("g", {
  //       data: [1, 2, 3],
  //       transform: (d) => `translate(${d * 20}, 50)`,
  //       children: [
  //         svg("circle", {
  //           r: 10,
  //         }),
  //       ],
  //     }),
  //   ],
  // });
  return cm.svg`<svg ${{
    width: 100,
    height: 100,
  }}>
    <g ${{
      data: [1, 2, 3],
      transform: (d) => `translate(${d * 20}, 50)`,
    }}>
      <circle ${{r: 10}}/>
    </g>
  </svg>`;
}

export function fragmentRoot() {
  // return svg("circle", {
  //   data: [1, 2, 3],
  //   cx: (d) => d * 20,
  //   cy: 50,
  //   r: 10,
  // });
  return cm.svg`<circle ${{
    data: [1, 2, 3],
    cx: (d) => d * 20,
    cy: 50,
    r: 10,
  }}/>`;
}

export function htmlAttributes() {
  // return html("div", {
  //   className: "hello",
  //   disabled: true,
  //   checked: true,
  //   selected: true,
  //   readOnly: true,
  //   hidden: true,
  //   placeholder: "hello",
  //   title: "hello",
  //   alt: "hello",
  //   href: "https://charmingjs.org",
  //   src: "https://charmingjs.org",
  // });
  return cm.html`<div ${{
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
  }}/>`;
}

export function setCallbackChildren() {
  // return svg("g", {
  //   data: [0, 1, 2],
  //   transform: (d) => `translate(${(d + 1) * 50}, 0)`,
  //   children: [
  //     (d, i, data) => {
  //       const a = d + i + data.length;
  //       return svg("circle", {
  //         r: 20,
  //         cy: 30,
  //         fill: `rgb(${a}, ${a}, ${a})`,
  //       });
  //     },
  //   ],
  // });
  return cm.svg`<g ${{
    data: [0, 1, 2],
    transform: (d) => `translate(${(d + 1) * 50}, 0)`,
  }}>
    ${(d, i, data) => {
      const a = d + i + data.length;
      return cm.svg`<circle ${{
        r: 20,
        cy: 30,
        fill: `rgb(${a}, ${a}, ${a})`,
      }}/>`;
    }}
  </g>`;
}

export function setDataChildrenStringNodes() {
  // return svg("svg", [
  //   svg("g", {
  //     data: [1, 2, 3],
  //     children: ["hello"],
  //   }),
  // ]);
  return cm.svg`<svg>
    <g ${{data: [1, 2, 3]}}>
      hello
    </g>
  </svg>`;
}
