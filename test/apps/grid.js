import * as cm from "@charming-art/charming";

export function grid() {
  const cells = [
    [1, 0, 1], // First row
    [0, 1, 0], // Second row
    [1, 0, 1], // Third row
  ];
  return cm.render({
    width: 600,
    height: 600,
    setup: cm.flow(
      cells,
      cm.flow(
        (rows, i) => rows.map((n, j) => ({n, i, j})),
        cm.circle({
          x: ({j}) => j * 200 + 100,
          y: ({i}) => i * 200 + 100,
          r: ({n}) => (n ? 80 : 40),
        }),
      ),
    ),
  });
}
