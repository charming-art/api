import {selectAll} from "d3-selection";
import "d3-transition";
import {component} from "echox";

// TODO: Add tests.
// TODO: Handle multiple nodes.
export const transition = component((props, flow) => {
  const {keyframes, children} = props;
  const node = children[0];
  const selection = selectAll([node]);
  let transition = selection;

  for (const {attr = {}, style = {}, duration, ease, delay} of keyframes) {
    transition = transition.transition();
    transition
      .duration(duration)
      .call((t) => ease && t.ease(ease))
      .call((t) => delay && t.delay(delay));
    for (const key in attr) transition.attr(key, attr[key]);
    for (const key in style) transition.style(key, style[key]);
  }

  flow().effect(() => () => selection.interrupt());

  return node;
});
