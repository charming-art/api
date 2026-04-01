import {tag} from "./tag.js";

export const svg = tag((string) => {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.innerHTML = string;
  return g;
});
