import isUrl from "is-url";
import qs from "qs";

/**
 * Matches a string containing at least one `key=value` pair. Equivalent to
 * /([^=&?]+)=([^&]+)/: if a key of any length precedes the `=`, so does a
 * key of one character, and likewise for the value.
 *
 * - No quantifiers, so it runs in linear time. The quantified form
 *   backtracked quadratically on long strings without a pair (a 28KB
 *   GraphQL query took over a second).
 * - No `g` flag, so `test` keeps no `lastIndex` between calls. With it, a
 *   match on one string made the check on the next string start part-way
 *   through, so a query string could skip redaction.
 */
const queryStringRegex = /[^=&?]=[^&]/;

export const safelyParseUrl = (data: string) => {
	try {
		const testUrl = isUrl(data);

		let parsedUrl = null;

		if (testUrl) {
			const url = new URL(data);

			const query = qs.parse(url.search, { ignoreQueryPrefix: true });
			url.search = "";

			parsedUrl = {
				url: url.href,
				query,
			};
		}

		const parsedQuery =
			!testUrl && queryStringRegex.test(data)
				? qs.parse(data, { ignoreQueryPrefix: true })
				: null;

		if (!parsedQuery && !parsedUrl) {
			throw new Error("invalid query string");
		}

		return {
			parsedQuery,
			parsedUrl,
		};
	} catch {
		return data;
	}
};
