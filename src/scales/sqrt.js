import { continuous } from "./continuous";

function transform(x) {
  return Math.sign(x) * Math.sqrt(Math.abs(x));
}

export function sqrt(domain, range) {
  return continuous(domain, range, { transform });
}
