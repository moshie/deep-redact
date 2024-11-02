import isUrl from "is-url";
import queryString from "query-string";

export const safelyParseUrl = (data: string) => {
	try {
		const urlTest = isUrl(data);
		const queryStringRegex = /([^=&?]+)=([^&]+)/g;

		const parsedUrl = urlTest ? queryString.parseUrl(data) : null;
		const parsedQuery =
			!urlTest && queryStringRegex.test(data) ? queryString.parse(data) : null;

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
