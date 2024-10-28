import { isPlainObject } from "./is-plain-object";

class MyCustomClass {}

test.each([
	[{}, true],
	[[], false],
	[null, false],
	[/regex/, false],
	[new Map(), false],
	[new Date(), false],
	[new MyCustomClass(), false],
])("isPlainObject(%o) -> %s", (obj, expected) => {
	expect(isPlainObject(obj)).toBe(expected);
});
