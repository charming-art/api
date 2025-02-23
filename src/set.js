const protoOf = Object.getPrototypeOf;

const propSetterCache = {};

const svgCamelCaseAttributes = new Set([
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan",
]);

const isSVGElement = (node) => node instanceof SVGElement;

const isFunction = (v) => typeof v === "function";

const toKebabCase = (str) => str.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

const specialKey = (k) => k.startsWith("on") || k.startsWith("style");

const svgKeyof = (key) => (svgCamelCaseAttributes.has(key) || specialKey(key) ? key : toKebabCase(key));

const lowerFirst = (str) => str.charAt(0).toLowerCase() + str.slice(1);

// @see https://github.com/vanjs-org/van/blob/main/src/van.js
function setAttribute(dom, k, v) {
  if (k.startsWith("on")) return dom.addEventListener(k.slice(2).toLowerCase(), v);
  if (k.startsWith("style")) return dom.style.setProperty(lowerFirst(k.slice(5)), v);
  const name = dom.tagName.toLowerCase();
  const get = (proto) => (proto ? (Object.getOwnPropertyDescriptor(proto, k) ?? get(protoOf(proto))) : undefined);
  const cacheKey = name + "," + k;
  const propSetter = (propSetterCache[cacheKey] ??= get(protoOf(dom))?.set ?? 0);
  const setter = propSetter ? propSetter.bind(dom) : dom.setAttribute.bind(dom, k);
  setter(v);
}

export function set(node, props) {
  const nodes = [node].flat(Infinity);
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    const keyof = isSVGElement(n) ? svgKeyof : (key) => key;
    for (const key in props) {
      const value = props[key];
      const k = keyof(key);
      const isChannel = !k.startsWith("on") && isFunction(value);
      setAttribute(n, k, isChannel ? value(n, i, nodes) : value);
    }
  }
}
