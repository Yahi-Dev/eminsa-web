import sanitizeHtml from "sanitize-html";

/**
 * Sanitizes HTML content to prevent XSS attacks.
 * Allows common rich-text formatting tags but strips scripts and dangerous attributes.
 */
export function sanitizeContent(dirty: string): string {
  // Convert plain-text line breaks to HTML so textarea content renders properly.
  // Double newlines become paragraph breaks, single newlines become <br>.
  // Auto-link plain URLs (http/https) that aren't already inside an <a> tag
  const linkified = dirty.replace(
    /(?<!["'=])(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-[#00269b] underline hover:text-[#0099ce]">$1</a>'
  );

  // Normalize Windows \r\n to \n before processing
  const normalized = linkified.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  const withBreaks = normalized.includes("<p>") || normalized.includes("<br")
    ? normalized // Already contains HTML markup — leave as-is
    : normalized
        // Split by 2+ consecutive newlines → separate <p> paragraphs (visible gap)
        .split(/\n{2,}/)
        .map((paragraph) => {
          // Within each paragraph, single newlines → <br> (same block, next line)
          const lines = paragraph.trim();
          if (!lines) return '';
          return `<p style="margin-bottom:1em;">${lines.replace(/\n/g, '<br>')}</p>`;
        })
        .filter(Boolean)
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
      "*": ["class", "id", "style"],
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
