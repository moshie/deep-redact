import { redact, replacer } from "./index";
import { getNormalizedList, withNormalizedList } from "./normalized-list";

const largeList = Array.from({ length: 12 }, (_, i) => `Key${i}`);

describe("normalized list", () => {
	test("should build a lower-cased Set for lists over the threshold", () => {
		const options = withNormalizedList({}, largeList);

		expect(getNormalizedList(options, largeList)).toEqual(
			new Set(largeList.map((key) => key.toLowerCase())),
		);
	});

	test("should not build a Set for short lists", () => {
		const options = withNormalizedList({}, ["email"]);

		expect(getNormalizedList(options, ["email"])).toBeUndefined();
	});

	test("should reuse the Set built for a redact call", () => {
		const options = withNormalizedList({}, largeList);

		expect(withNormalizedList(options, largeList)).toBe(options);
		expect(getNormalizedList(options, largeList)).toBe(
			getNormalizedList(options, largeList),
		);
	});

	test("should pick up keys added to the list between redact calls", () => {
		const list = [...largeList];
		const options = { list };
		const data = { key0: "a", added: "b" };

		expect(redact(data, options)).toEqual({ key0: "[REDACTED]", added: "b" });

		list.push("added");

		expect(redact(data, options)).toEqual({
			key0: "[REDACTED]",
			added: "[REDACTED]",
		});
	});

	test("should not trust a Set passed in through the public option", () => {
		const result = redact(
			{ key0: "a" },
			{ list: largeList, normalizedList: new Set() },
		);

		expect(result).toEqual({ key0: "[REDACTED]" });
	});

	test.each([
		["a large", largeList, { key0: "[REDACTED]", keep: "b" }],
		["a short", ["key0"], { key0: "[REDACTED]", keep: "b" }],
		["no", undefined, { key0: "a", keep: "b" }],
	])(
		"should work as a JSON.stringify replacer with %s list",
		(_, list, expected) => {
			const raw = JSON.stringify({ key0: "a", keep: "b" }, replacer({ list }));

			expect(JSON.parse(raw)).toEqual(expected);
		},
	);
});
