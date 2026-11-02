/**
 * relaxed-json only parses a string to an object or array when it starts
 * with `{`, `[` or a comment (after whitespace).
 */
const jsonStart = /^\s*(?:[[{]|\/[/*])/;

export const startsLikeJson = (value: string) => jsonStart.test(value);

/**
 * Cheap pre-check for whether redaction could change a string. Every string
 * the replacer transforms needs at least one of:
 *
 * - JSON: see startsLikeJson.
 * - URL: is-url requires `//`.
 * - Query string: a `key=value` pair requires `=`.
 *
 * Anything else, such as numbers, dates or plain text, is returned as is
 * without paying for a parse.
 */
export const mayHoldRedactableData = (value: string) =>
	value.includes("=") || value.includes("//") || startsLikeJson(value);
