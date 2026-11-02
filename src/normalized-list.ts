import type { List, RedactOptions } from "./types";

// Lists longer than this are looked up through a lower-cased Set; shorter ones
// are scanned, which is faster for a handful of keys.
const SET_THRESHOLD = 10;

// Private, so a caller can't hand in a Set that disagrees with their list.
const normalizedListKey = Symbol("deep-redact.normalizedList");

type WithNormalizedList = RedactOptions & {
	[normalizedListKey]?: Set<string>;
};

const buildNormalizedList = (list: List) =>
	list.length > SET_THRESHOLD
		? new Set(list.map((key) => key.toLowerCase()))
		: undefined;

/**
 * Builds the lower-cased key Set once per top-level redact() call. Nested
 * calls receive these options and reuse it, rather than rebuilding it for
 * every string. It is built from the list at call time, so a list changed
 * between calls is never served from a stale cache.
 */
export const withNormalizedList = (
	options: RedactOptions,
	list: List,
): WithNormalizedList => {
	if (normalizedListKey in options) {
		return options as WithNormalizedList;
	}

	const withList: WithNormalizedList = {
		...options,
		[normalizedListKey]: buildNormalizedList(list),
	};

	return withList;
};

/**
 * The Set for these options: reused when redact() built one, or built here
 * when the replacer is used directly with JSON.stringify.
 */
export const getNormalizedList = (options: RedactOptions, list: List) =>
	normalizedListKey in options
		? (options as WithNormalizedList)[normalizedListKey]
		: buildNormalizedList(list);
