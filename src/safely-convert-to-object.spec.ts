import { safelyConvertToObject } from "./safely-convert-to-object";

describe("# Safely convert to object", () => {
	test("should convert lesser known object types to an object", () => {
		class TestObject {
			test = "hello";
		}

		expect(safelyConvertToObject(new TestObject())).toEqual({
			test: "hello",
		});
	});

	test("should handle null", () => {
		expect(safelyConvertToObject(null)).toEqual(null);
	});

	test("should return false if unable to convert the value", () => {
		// @ts-expect-error Testing if the JSON functions where unable to stringify / parse the value
		expect(safelyConvertToObject(undefined)).toEqual(false);
	});
});
