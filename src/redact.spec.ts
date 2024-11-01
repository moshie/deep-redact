import { redact } from "./index";
import { testObject, expectedTestObject } from "./fixtures/examples";

describe("redact", () => {
	test("should return the data if no keys are passed", () => {
		const data = { email: "hello@test.com" };
		const result = redact(data, {
			list: [],
		});

		expect(result).toEqual(data);
	});

	test("should redact a simple object if keys exist in the provided list", () => {
		const data = {
			email: "hello@test.com",
			password: "123456",
			dontReactMe: "123456",
		};
		const result = redact(data, {
			list: ["email", "password"],
		});

		expect(result).toEqual({
			email: "[REDACTED]",
			password: "[REDACTED]",
			dontReactMe: "123456",
		});
	});

	test("should allow you to set your own redact string", () => {
		const data = {
			email: "hello@test.com",
			password: "123456",
			dontReactMe: "123456",
		};
		const result = redact(data, {
			list: ["email", "password"],
			redactString: "[CANT-SEE-ME]",
		});

		expect(result).toEqual({
			email: "[CANT-SEE-ME]",
			password: "[CANT-SEE-ME]",
			dontReactMe: "123456",
		});
	});

	test("should redact nested objects", () => {
		const data = {
			deep: {
				email: {
					email: "",
				},
				password: {
					password: "123456",
				},
			},
		};
		const result = redact(data, {
			list: ["email", "password"],
		});

		expect(result).toEqual({
			deep: {
				email: {
					email: "[REDACTED]",
				},
				password: {
					password: "[REDACTED]",
				},
			},
		});
	});

	test("should redact arrays", () => {
		const data = [
			{
				email: "hello@email.com",
				password: "123456",
				deep: [
					{
						email: "hello@email.com",
					},
					{
						password: "123456",
					},
				],
			},
			{
				email: "test@email.com",
			},
		];
		const result = redact(data, {
			list: ["email", "password"],
		});

		expect(result).toEqual([
			{
				email: "[REDACTED]",
				password: "[REDACTED]",
				deep: [
					{
						email: "[REDACTED]",
					},
					{
						password: "[REDACTED]",
					},
				],
			},
			{
				email: "[REDACTED]",
			},
		]);
	});

	test("should redact maps", () => {
		const m = new Map();
		m.set("email", "test@email.com");
		const data = {
			myMap: m,
		};
		const result = redact(data, {
			list: ["email"],
		});
		expect(result).toEqual({
			myMap: {
				email: "[REDACTED]",
			},
		});
	});

	test("should redact sets", () => {
		const s = new Set([
			{
				email: "hello@test.com",
			},
			{
				email: "another@test.com",
			},
		]);
		const data = {
			mySet: s,
		};
		const result = redact(data, {
			list: ["email"],
		});
		expect(result).toEqual({
			mySet: [
				{
					email: "[REDACTED]",
				},
				{
					email: "[REDACTED]",
				},
			],
		});
	});

	test("should redact dates", () => {
		const data = {
			date: new Date(),
		};
		const result = redact(data, {
			list: ["date"],
		});
		expect(result).toEqual({
			date: "[REDACTED]",
		});
	});

	test("should redact Regex", () => {
		const data = {
			email: /test/g,
		};
		const result = redact(data, {
			list: ["email"],
		});
		expect(result).toEqual({
			email: "[REDACTED]",
		});
	});

	test("should redact classes", () => {
		class TestClass {
			email = "test@email.com";
		}
		const data = {
			myClass: new TestClass(),
		};
		const result = redact(data, {
			list: ["email"],
		});
		expect(result).toEqual({
			myClass: {
				email: "[REDACTED]",
			},
		});
	});

	test("should redact json in string form", () => {
		const data = {
			data: '{ "email": "hello@email.com" }',
			password: '{ "password": "12345" }',
			arr: '[{ "email": "hello@email.com" }]',
		};
		const result = redact(data, {
			list: ["email", "password"],
		});
		expect(result).toEqual({
			data: { email: "[REDACTED]" },
			password: {
				password: "[REDACTED]",
			},
			arr: [
				{
					email: "[REDACTED]",
				},
			],
		});
	});

	test("should not convert string with numbers in it to a number type", () => {
		const data = '[{ "password": "123456" }]';
		const result = redact(data, {
			list: ["email"],
		});
		expect(result).toEqual([
			{
				password: "123456",
			},
		]);
	});

	test("should not convert the redacted string into an array by mistake", () => {
		const data = "[REDACTED]";
		const result = redact(data, {
			redactString: "[REDACTED]",
			list: ["test"],
		});
		expect(result).toEqual("[REDACTED]");
	});

	test("should convert a top level string to a redacted object", () => {
		const data = '[{ "data": { "email": "123456", "password": 123456 } }]';
		const result = redact(data, {
			redactString: "[REDACTED]",
			list: ["email", "password"],
		});
		expect(result).toEqual([
			{
				data: {
					email: "[REDACTED]",
					password: "[REDACTED]",
				},
			},
		]);
	});

	test("should handle converting string to booleans", () => {
		const data =
			'[{ "data": { "email": "123456", "thing": true, "another": false } }]';
		const result = redact(data, {
			redactString: "[REDACTED]",
			list: ["email"],
		});
		expect(result).toEqual([
			{
				data: {
					email: "[REDACTED]",
					thing: true,
					another: false,
				},
			},
		]);
	});

	test("should handle large object test", () => {
		const result = redact(testObject, {
			redactString: "[REDACTED]",
			list: ["email", "password"],
		});
		expect(result).toEqual(expectedTestObject);
	});

	test.only("should redact url parameters", () => {
		const data = {
			url: "https://cv.moshie.dev/redactor?this=test&password=12345&email=hello@test.com",
		};
		const result = redact(data, {
			redactString: "[REDACTED]",
			list: ["password", "email"],
		});
		expect(result).toEqual({
			url: "https://cv.moshie.dev/redactor?this=test&password=[REDACTED]&email=[REDACTED]",
		});
	});
});
