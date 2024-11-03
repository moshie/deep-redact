import isUrl from "is-url";
import qs from "qs";

export const safelyParseUrl = (data: string) => {
	try {
		const testUrl = isUrl(data);
		const queryStringRegex = /([^=&?]+)=([^&]+)/g;

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
