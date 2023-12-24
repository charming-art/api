import { continuous } from "./continuous";

function transform(x) {
  return x;
}

export function linear(domain, range, options) {
  return continuous(domain, range, { ...options, transform });
}
