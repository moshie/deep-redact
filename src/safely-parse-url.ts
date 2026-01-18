import isUrl from "is-url";
import qs from "qs";

// Move regex outside function for better performance
const queryStringRegex = /([^=&?]+)=([^&]+)/g;

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
