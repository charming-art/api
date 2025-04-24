import {interval} from "d3-timer";
import {Renderer} from "./renderer.js";

export const drawRef = {current: null};

const isFunction = (x) => typeof x === "function";

const isStr = (x) => typeof x === "string";

const isDefined = (x) => x !== undefined && x !== null;

function applyAttributes(node, options, values, context = {}) {
  const {use} = context;
  const decorators = [];
  const props = {};

  for (const [k, v] of Object.entries(options)) {
    if (use && k in use && isDefined(v)) decorators.push([use[k], v]);
    else if (k !== "use") props[k] = v;
  }

  const {attrs = () => ({}), renderer, ...rest} = props;
  const {datum, i, data} = values;
  const eventValues = {};
  const attrValues = {};
  for (const [k, v] of Object.entries({...attrs(datum, i, data), ...rest})) {
    if (k.startsWith("on")) eventValues[k] = (event) => v(event, datum, i, data);
    else attrValues[k] = isFunction(v) ? v(datum, i, data) : v;
  }
  renderer.events(node, eventValues);
  renderer.attrs(node, attrValues);

  for (const [type, decorator] of decorators) {
    const options = isFunction(decorator) ? decorator(datum, i, data) : decorator;
    type(node, options, context);
  }

  return node;
}

function bindIndex(data, nodes, enter, update, exit) {
  const dataLength = data.length;
  const nodeLength = nodes.length;

  let i = 0;
  let node;

  for (; i < dataLength; i++) {
    if ((node = nodes[i])) update[i] = node;
    else enter[i] = {datum: data[i], next: null};
  }

  for (; i < nodeLength; i++) exit[i] = nodes[i];
}

function addTimer(parent, key, timer) {
  const timers = parent.__timers__ ?? new Map();
  parent.__timers__ = timers;
  timers.set(key, timer);
}

function removeTimer(parent, key) {
  const timers = parent.__timers__ ?? new Map();
  parent.__timers__ = timers;
  if (timers.has(key)) {
    const timer = timers.get(key);
    timer.stop();
    timers.delete(key);
    return timer;
  }
  return null;
}

function markof(group) {
  if (!group) return [];
  const {children, datum, i, data} = group;
  return [isFunction(children) ? children(datum, i, data) : children].flat(Infinity).map((d) => d.clone());
}

function isDocumentFragment(node) {
  return node.nodeName === "#document-fragment";
}

function postprocess(node) {
  if (!isDocumentFragment(node)) return node;
  if (node.childNodes.length === 1) return node.firstChild;

  const root =
    node.firstChild instanceof SVGElement
      ? document.createElementNS("http://www.w3.org/2000/svg", "g")
      : document.createElement("span");

  root.append(node);
  return root;
}

function patchMark(parent, mark, context) {
  const data = mark._update?._data ?? mark._data;
  const props = mark._update?._props ?? mark._props;
  const children = mark._update?._children ?? mark._children;
  const isStatic = mark._update?._static ?? mark._static;
  const nextNode = mark._next?._nodes?.[0] ?? null;
  const {loop, ...attrs} = props;

  const tag = mark._tag;
  const nodes = mark._nodes ?? [];
  const dataLength = data.length;
  const nodeLength = nodes.length;
  const enter = new Array(dataLength);
  const update = new Array(dataLength);
  const exit = new Array(nodeLength);
  const newNodes = (mark._nodes = new Array(dataLength));
  const newGroups = new Array(dataLength);

  bindIndex(data, nodes, enter, update, exit);

  let previous, next;
  for (let i0 = 0, i1 = 0; i0 < dataLength; i0++) {
    if ((previous = enter[i0])) {
      if (i0 >= i1) i1 = i0 + 1;
      while (!(next = update[i1]) && ++i1 < nodeLength);
      previous.next = next ?? nextNode;
    }
  }

  let current;

  for (let i = 0; i < dataLength; i++) {
    if ((current = enter[i])) {
      const {datum, next} = current;
      const node = mark.create(tag, attrs, {datum, i, data}, context);
      parent?.insertBefore(node, next);
      newNodes[i] = node;
      newGroups[i] = {children, datum, i, data, loop};
    }
  }

  for (let i = 0; i < nodeLength; i++) {
    if ((current = update[i])) {
      const datum = data[i];
      newNodes[i] = mark.create(current, attrs, {datum, i, data}, context);
      newGroups[i] = {children, datum, i, data, loop};
    }
  }

  for (let i = 0; i < nodeLength; i++) if ((current = exit[i])) current.remove();

  return [newNodes, newGroups, isStatic];
}

// Assume the structure is not going to change for now.
function patch(parent, prev, current, context, timers) {
  let mark;
  const m = current.length;
  const update = new Array(m);

  for (let i = 0; i < m; i++) {
    update[i] = (mark = prev[i]) ? ((mark._update = current[i]), mark) : (mark = current[i]);
    mark._next = prev[i + 1] ?? null;
    const [parents, childGroups, isStatic] = patchMark(parent, mark, context);
    const groups = mark._groups ?? [];

    for (let j = 0; j < parents.length; j++) {
      const groupParent = parents[j];
      const oldChildren = groups[j] ?? null;
      const newChildren = childGroups[j];
      const newLoop = newChildren?.loop ?? false;
      const isCallback = isFunction(newChildren?.children);

      // Remove old timer if exists.
      const oldTimer = removeTimer(groupParent, oldChildren);
      if (oldTimer) timers.delete(oldTimer);

      // Only static marks can be animated and interactive.
      if (isStatic && (newLoop || isCallback)) {
        const templateChildren = {...newChildren};

        // Rerender the children.
        let oldMarks = oldChildren?.children ?? [];
        const frame = (options) => {
          const {children} = templateChildren;
          const newMarks = markof({...templateChildren, children: children(options)});
          const prev = (oldMarks = patch(groupParent, oldMarks, newMarks, context));
          newChildren.children = prev;
        };

        // Call frame and make it reactive.
        let frameCount = 0;
        drawRef.current = frame;
        frame({time: 0, frameCount});
        drawRef.current = null;

        // Add new timer.
        if (newLoop) {
          const {frameRate} = newLoop;
          const delay = frameRate ? 1000 / frameRate : undefined;
          const timer = interval((time) => frame({time, frameCount: ++frameCount}), delay);
          addTimer(groupParent, newChildren, timer);
          timers.add(timer);
        }
      } else {
        const prev = patch(groupParent, oldChildren?.children ?? [], markof(newChildren), context);
        newChildren.children = prev;
      }

      groups[j] = newChildren;
    }
    mark._groups = groups;
  }

  return update;
}

export class Mark {
  constructor(tag, data, options) {
    const isStatic = options === undefined;
    if (isStatic) (options = data), (data = [0]);
    const {children = [], ...props} = options ?? {};

    this._tag = tag;
    this._static = isStatic;
    this._data = data;
    this._options = options;
    this._props = props;
    this._children = children;
    this._update = null;
    this._nodes = null;
    this._next = null;
    this._groups = null;
    this._timers = new Set();
  }
  create(current, options, values, context) {
    const renderer = options?.renderer ?? context?.renderer ?? new Renderer();
    const node = isStr(current) ? renderer.create(current) : current;
    return applyAttributes(node, {...options, renderer}, values, context);
  }
  render(parent = document.createDocumentFragment()) {
    const root = () => (parent = postprocess(parent));
    const context = {...this._props, root};
    patch(parent, [], [this], context, this._timers);
    return postprocess(parent);
  }
  unmount() {
    const nodes = this._nodes ?? [];
    const timers = this._timers;
    for (const node of nodes) node.remove();
    for (const timer of timers) timer.stop();
  }
  nodes() {
    return this._nodes;
  }
  node() {
    return this._nodes?.[0] ?? null;
  }
  clone() {
    return new this.constructor(this._tag, this._data, this._options);
  }
}

export const svg = (tag, data, options) => new Mark(`svg:${tag}`, data, options);

export const html = (tag, data, options) => new Mark(tag, data, options);
