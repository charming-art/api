import { continuous } from "./continuous";

function transform(x) {
  return Math.log(x);
}

export function log(domain, range, options = {}) {
  return continuous(domain, range, { ...options, transform });
}
