export function measureText(text, styles) {
  const span = document.createElement("span");

  // Hide span.
  span.style.visibility = "hidden";
  span.style.position = "absolute";
  span.style.display = "inline-block";
  span.style.left = "-9999em";
  span.style.top = "0";
  span.style.lineHeight = "normal";
  span.setAttribute("aria-hidden", true);

  // Font attributes.
  span.style.fontSize = `${styles.fontSize}px`;
  span.style.fontFamily = styles.fontFamily;

  span.innerHTML = text;
  document.body.appendChild(span);

  const bbox = span.getBoundingClientRect();
  return { width: bbox.width, height: Math.ceil(bbox.height) };
}
