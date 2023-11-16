export function cross(...values) {
  const product = [];
  const lengths = values.map((d) => d.length);
  const n = values.length - 1;
  const index = new Array(n + 1).fill(0);
  while (true) {
    product.push(index.map((i, j) => values[j][i]));
    let m = n;
    while (++index[m] === lengths[m]) {
      if (m === 0) return product;
      index[m--] = 0;
    }
  }
}
