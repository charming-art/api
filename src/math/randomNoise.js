import { linear } from "../scale/linear.js";
import { random } from "./random.js";

const PERLIN_YWRAPB = 4;
const PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
const PERLIN_ZWRAPB = 8;
const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
const PERLIN_SIZE = 4095;

function scaledCosine(i) {
  return 0.5 * (1.0 - Math.cos(i * Math.PI));
}

function randomLcg(seed) {
  const m = 4294967296;
  const a = 1664525;
  const c = 1013904223;
  let z = (seed == null ? Math.random() * m : seed) >>> 0;
  return () => {
    z = (a * z + c) % m;
    return z / m;
  };
}

function noiseSeed(seed) {
  const random = randomLcg(seed);
  const perlin = new Array(PERLIN_SIZE + 1);
  for (let i = 0; i < PERLIN_SIZE + 1; i++) {
    perlin[i] = random();
  }
  return perlin;
}

// Adapting from P5.js
// @see https://github.com/processing/p5.js/blob/1e6b0caa1e8a8dff3280917d2fd9a84d2e7126ba/src/math/noise.js#L200
export function randomNoise(lo = 0, hi = 1, { octaves = 4, seed = random(100000), falloff = 0.5 } = {}) {
  const map = linear([0, 1], [lo, hi]);
  const perlin = noiseSeed(seed);

  const noise = (x, y = 0, z = 0) => {
    if (x < 0) x = -x;
    if (y < 0) y = -y;
    if (z < 0) z = -z;

    let xi = Math.floor(x),
      yi = Math.floor(y),
      zi = Math.floor(z);
    let xf = x - xi;
    let yf = y - yi;
    let zf = z - zi;
    let rxf, ryf;

    let r = 0;
    let ampl = 0.5;

    let n1, n2, n3;

    for (let o = 0; o < octaves; o++) {
      let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);

      rxf = scaledCosine(xf);
      ryf = scaledCosine(yf);

      n1 = perlin[of & PERLIN_SIZE];
      n1 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n1);
      n2 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
      n2 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
      n1 += ryf * (n2 - n1);

      of += PERLIN_ZWRAP;
      n2 = perlin[of & PERLIN_SIZE];
      n2 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n2);
      n3 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
      n3 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
      n2 += ryf * (n3 - n2);

      n1 += scaledCosine(zf) * (n2 - n1);

      r += n1 * ampl;
      ampl *= falloff;
      xi <<= 1;
      xf *= 2;
      yi <<= 1;
      yf *= 2;
      zi <<= 1;
      zf *= 2;

      if (xf >= 1.0) {
        xi++;
        xf--;
      }
      if (yf >= 1.0) {
        yi++;
        yf--;
      }
      if (zf >= 1.0) {
        zi++;
        zf--;
      }
    }
    return r;
  };

  return (x0 = 0, y0 = 0, z0 = 0) => map(noise(x0, y0, z0));
}
