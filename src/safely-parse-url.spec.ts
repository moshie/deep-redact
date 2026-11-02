import { safelyParseUrl } from "./safely-parse-url";

describe("# safely parse url", () => {
	test("should return back the string if nonsense", () => {
		const data = "fesnfeebsfehfioshfesiofe";
		expect(safelyParseUrl(data)).toEqual(data);
	});

	test("should return back the string if it looks like a URL but isn't valid", () => {
		// is-url accepts it, but the port is out of range so new URL() throws
		const data = "http://example.com:99999/path?password=secret";
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

	test("should parse a query string after a previous query string was parsed", () => {
		// A stateful (global) regex would resume from the previous match's lastIndex and miss this one
		safelyParseUrl("iam=query&parameters=yes&i=am");
		expect(safelyParseUrl("a=b")).toEqual({
			parsedQuery: { a: "b" },
			parsedUrl: null,
		});
	});

	test.each([
		["=value", "no key before the equals"],
		["key=", "no value after the equals"],
		["key=&other", "value starts with an ampersand"],
		["?=value", "key is only a question mark"],
		["&=value", "key is only an ampersand"],
	])("should not treat %j as a query string (%s)", (data) => {
		expect(safelyParseUrl(data)).toEqual(data);
	});

	describe("long strings (ReDoS)", () => {
		// Quadratic backtracking took ~1.3s on a 28KB GraphQL query; linear checks take well under 1ms
		const budgetMs = 100;
		const length = 50_000;

		const timed = (data: string) => {
			const start = performance.now();
			const result = safelyParseUrl(data);
			return { result, ms: performance.now() - start };
		};

		test("should quickly reject a long string with no equals sign", () => {
			const data = "query Page { page { id slug title } }\n".repeat(
				length / 38,
			);
			const { result, ms } = timed(data);

			expect(result).toEqual(data);
			expect(ms).toBeLessThan(budgetMs);
		});

		test("should quickly reject a long string whose only equals sign follows a separator", () => {
			const data = `${"a".repeat(length)}?=b`;
			const { result, ms } = timed(data);

			expect(result).toEqual(data);
			expect(ms).toBeLessThan(budgetMs);
		});

		test("should quickly parse a long key", () => {
			const { result, ms } = timed(`${"a".repeat(length)}=b`);

			expect(result).toEqual({
				parsedQuery: { ["a".repeat(length)]: "b" },
				parsedUrl: null,
			});
			expect(ms).toBeLessThan(budgetMs);
		});
	});
});
