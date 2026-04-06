import sanitizeHtml from "sanitize-html";

/**
 * Sanitizes HTML content to prevent XSS attacks.
 * Allows common rich-text formatting tags but strips scripts and dangerous attributes.
 */
export function sanitizeContent(dirty: string): string {
  // Convert plain-text line breaks to HTML so textarea content renders properly.
  // Double newlines become paragraph breaks, single newlines become <br>.
  const withBreaks = dirty.includes("<p>") || dirty.includes("<br")
    ? dirty // Already contains HTML markup — leave as-is
    : dirty
        .split(/\n/)
        .filter((line) => line.trim() !== "")
        .map((line) => `<p>${line}</p>`)
        .join("");

  return sanitizeHtml(withBreaks, {
    allowedTags: [
      "h1", "h2", "h3", "h4", "h5", "h6",
      "p", "br", "hr",
      "strong", "b", "em", "i", "u", "s", "del",
      "ul", "ol", "li",
      "blockquote", "pre", "code",
      "a",
      "img",
      "table", "thead", "tbody", "tr", "th", "td",
      "div", "span",
      "figure", "figcaption",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      "*": ["class", "id"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    // Force external links to be safe
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          // Force rel="noopener noreferrer" on external links
          ...(attribs.target === "_blank"
            ? { rel: "noopener noreferrer" }
            : {}),
        },
      }),
    },
    // Disallow javascript: in href or src
    allowedSchemesByTag: {
      a: ["http", "https", "mailto"],
      img: ["http", "https", "data"],
    },
  });
}
