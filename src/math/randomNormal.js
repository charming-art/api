// @see https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
// @see https://github.com/d3/d3-random/blob/main/src/normal.js
export function randomNormal(mu = 0, sigma = 1) {
  let x = null;
  let r = null;
  return () => {
    let y;
    if (x !== null) (y = x), (x = null);
    else
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        r = x * x + y * y;
      } while (!r || r > 1);
    return mu + sigma * y * Math.sqrt((-2 * Math.log(r)) / r);
  };
}
