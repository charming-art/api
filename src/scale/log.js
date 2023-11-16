import { continuous } from "./continuous";

function transform(x) {
  return Math.log(x);
}

export function log(domain, range) {
  return continuous(domain, range, { transform });
}
