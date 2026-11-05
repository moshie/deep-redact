import relaxedJson from "@fregante/relaxed-json";
import { mayHoldRedactableData } from "./may-hold-redactable-data";
import { safelyParseUrl } from "./safely-parse-url";

describe("mayHoldRedactableData", () => {
	test.each([
		"password=secret",
		"1&password=secret",
		"https://example.com/path",
		"//example.com/path",
		'{"password":"secret"}',
		"  [1, 2]",
		"\n{ password: secret }",
		"/* comment */ {a: 1}",
		"// comment\n{a: 1}",
	])("should check %j", (value) => {
		expect(mayHoldRedactableData(value)).toBe(true);
	});

	test.each([
		"123456",
		"-1.5e3",
		"2026-11-02T12:00:00.000Z",
		"07700900123",
		"plain text",
		"query Page { page { id } }",
		"",
	])("should skip %j", (value) => {
		expect(mayHoldRedactableData(value)).toBe(false);
	});

	test.each([
		"123456",
		"-1.5e3",
		"2026-11-02T12:00:00.000Z",
		"plain text",
		"query Page { page { id } }",
		"a: 1",
		"true",
		'"quoted"',
	])("should only skip strings the parsers leave alone (%j)", (value) => {
		expect(mayHoldRedactableData(value)).toBe(false);
		expect(safelyParseUrl(value)).toBe(value);

		let parsed: unknown;
		try {
			parsed = relaxedJson.parse(value);
		} catch {
			parsed = undefined;
		}
		expect(parsed !== null && typeof parsed === "object").toBe(false);
	});
});
