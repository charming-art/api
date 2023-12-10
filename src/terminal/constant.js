// For vite env.
const isNode = typeof navigator === "undefined" ? true : false;

const userAgent = isNode ? "node" : navigator.userAgent;

const isFireFox = userAgent.includes("Firefox");

const isLegacyEdge = userAgent.includes("Edge");

export const NULL_VALUE = 0xffffffff;

export const CELL_SIZE = 4;

// https://github.com/xtermjs/xterm.js/blob/096fe171356fc9519e0a6b737a98ca82d0587e91/src/browser/renderer/shared/Constants.ts#LL14C1-L14C1
export const TEXT_BASELINE = isFireFox || isLegacyEdge ? "bottom" : "ideographic";
