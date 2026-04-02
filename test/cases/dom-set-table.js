import * as cm from "../../src/index.js";

export function domSetTable() {
  const table = [
    [11975, 5871, 8916, 2868],
    [1951, 10048, 2060, 6171],
    [8010, 16145, 8090, 8045],
    [1013, 990, 940, 6907],
  ];
  return cm.html`<table>
    <tbody>
      <tr ${{data: table}}>
        <td ${{data: (d) => d, textContent: (d) => d}}/>
      </tr>
    </tbody>
  </table>`;
}
