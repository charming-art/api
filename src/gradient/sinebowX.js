import { interpolateSinebow } from "d3-scale-chromatic";
import { defineX } from "./define.js";

export const sineBowX = defineX(interpolateSinebow);
