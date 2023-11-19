import { linear as scaleLinear } from "../scale/linear.js";

export function defineX(interpolator) {
  return () => {
    return () => {
      return (width) => {
        const scale = scaleLinear([0, width], [0, 1]);
        return (i) => interpolator(scale(i));
      };
    };
  };
}
