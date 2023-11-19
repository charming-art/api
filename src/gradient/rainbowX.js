import { interpolateRainbow } from "d3-scale-chromatic";
import { defineX } from "./define.js";

export const rainbowX = defineX(interpolateRainbow);
