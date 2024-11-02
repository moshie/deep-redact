import { safelyParseUrl } from "./safely-parse-url";

describe("# safely parse url", () => {
	test("should return back the string if nonsense", () => {
		const data = "fesnfeebsfehfioshfesiofe";
		expect(safelyParseUrl(data)).toEqual(data);
	});

	test("should parse a url correctly", () => {
		const data = "https://www.test.com/thing?iam=query&parameters=yes&i=am";
		expect(safelyParseUrl(data)).toEqual({
			parsedUrl: {
				url: "https://www.test.com/thing",
				query: {
					iam: "query",
					parameters: "yes",
					i: "am",
				},
			},
			parsedQuery: null,
		});
	});

	test("should parse what looks like query parameters correctly", () => {
		const data = "iam=query&parameters=yes&i=am";
		expect(safelyParseUrl(data)).toEqual({
			parsedQuery: {
				iam: "query",
				parameters: "yes",
				i: "am",
			},
			parsedUrl: null,
		});
	});

	test("should parse if query string contains a question mark at the start", () => {
		const data = "?iam=query&parameters=yes&i=am";
		expect(safelyParseUrl(data)).toEqual({
			parsedQuery: {
				iam: "query",
				parameters: "yes",
				i: "am",
			},
			parsedUrl: null,
		});
	});
});
