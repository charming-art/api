import { continuous } from "./continuous";

function transform(x) {
  return x;
}

export function linear(domain, range) {
  return continuous(domain, range, { transform });
}
