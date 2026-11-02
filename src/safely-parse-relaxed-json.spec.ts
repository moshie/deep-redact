import { safelyParseRelaxedJson } from "./safely-parse-relaxed-json";

describe("Safely parse JSON", () => {
	test("should return false if unable to parse JSON", () => {
		expect(
			safelyParseRelaxedJson("I am not json so I should return false"),
		).toBe(false);
	});

	test("should return false if jiberish is passed", () => {
		expect(safelyParseRelaxedJson("fesfefejibfejkebsjbifbfibesiufbubseu")).toBe(
			false,
		);
	});

	test("should return an object if actual JSON", () => {
		const data = '[{ "email": "hello@gmail.com" }]';
		const result = safelyParseRelaxedJson(data);
		expect(result).toEqual([
			{
				email: "hello@gmail.com",
			},
		]);
	});

	test("should handle relaxed json", () => {
		const data = "[{ email: 'hello@email.com' }]";
		const result = safelyParseRelaxedJson(data);
		expect(result).toEqual([
			{
				email: "hello@email.com",
			},
		]);
	});

	test("should return false if the JSON is not an object or array", () => {
		expect(safelyParseRelaxedJson("/* a comment */ 5")).toBe(false);
	});

	test("should parse JSON that starts with a comment", () => {
		expect(safelyParseRelaxedJson("// a comment\n{ email: 'a' }")).toEqual({
			email: "a",
		});
	});

	test.each(["a=1&b={c}", "plain text", "5"])(
		"should not parse %j, which can't be an object or array",
		(value) => {
			expect(safelyParseRelaxedJson(value)).toBe(false);
		},
	);

	test("should remove comments from json", () => {
		const data = `[
            // I am a comment
            {
                email: 'hello@email.com'
            }
            /** so am i */
        ]`;
		const result = safelyParseRelaxedJson(data);
		expect(result).toEqual([
			{
				email: "hello@email.com",
			},
		]);
	});
});
