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
  "textContent", // For text elements.
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan",
]);

const directAttributes = new Set(["textContent", "innerHTML", "className"]);

const toKebabCase = (str) => str.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

const svgKeyof = (key) => (svgCamelCaseAttributes.has(key) ? key : toKebabCase(key));

const lowerFirst = (str) => str.charAt(0).toLowerCase() + str.slice(1);

export function setAttribute(dom, k, v) {
  if (k.startsWith("on")) return dom.addEventListener(k.slice(2).toLowerCase(), v);
  if (k.startsWith("style")) return dom.style.setProperty(lowerFirst(k.slice(5)), v);
  k = svgKeyof(k);
  const [set, get] = directAttributes.has(k)
    ? [(dom[k] = v), () => dom[k]]
    : [dom.setAttribute.bind(dom, k), dom.getAttribute.bind(dom, k)];
  if (get() === v + "") return; // get() returns a string, such as stroke-width.
  set(v);
}
