export const testObject = {
	sensitiveDataJsonAsString:
		'{ "email": "hello@test.com", "password": "123456", "dontRedactMe": "123456" }',
	sensitiveDataObjectAsString:
		'{ email: "hello@test.com", password: "123456", dontRedactMe: "123456" }',
	sensitiveDataObject: {
		email: "hello@test.com",
		password: "123456",
		dontRedactMe: "123456",
	},
	sensitiveDataArray: [
		{
			email: "hello@test.com",
			password: "123456",
			dontRedactMe: "123456",
		},
	],
	deepSensitiveDataObject: {
		email: {
			email: "hello@test.com",
			password: "123456",
			dontRedactMe: "123456",
		},
	},
	DeepSensitiveDataArray: [
		{
			deep: [
				{
					email: "hello@test.com",
					dontRedactMe: "123456",
				},
				{
					password: "123456",
					dontRedactMe: "123456",
				},
			],
		},
	],
	sensitiveDataArrayAsString:
		'[{ "email": "hello@test.com", "dontReactMe": "123456" }]',
	sensitiveDataObjectWithStringObjects: {
		email: '{ "email": "hello@test.com" }',
		password: '{ "password": "password" }',
		dontRedactMe: '{ "dontRedactMe": "123456" }',
	},
	email: true,
};

export const expectedTestObject = {
	sensitiveDataJsonAsString: {
		email: "[REDACTED]",
		password: "[REDACTED]",
		dontRedactMe: "123456",
	},
	sensitiveDataObjectAsString: {
		email: "[REDACTED]",
		password: "[REDACTED]",
		dontRedactMe: "123456",
	},
	sensitiveDataObject: {
		email: "[REDACTED]",
		password: "[REDACTED]",
		dontRedactMe: "123456",
	},
	sensitiveDataArray: [
		{
			email: "[REDACTED]",
			password: "[REDACTED]",
			dontRedactMe: "123456",
		},
	],
	deepSensitiveDataObject: {
		email: {
			email: "[REDACTED]",
			password: "[REDACTED]",
			dontRedactMe: "123456",
		},
	},
	DeepSensitiveDataArray: [
		{
			deep: [
				{
					email: "[REDACTED]",
					dontRedactMe: "123456",
				},
				{
					password: "[REDACTED]",
					dontRedactMe: "123456",
				},
			],
		},
	],
	sensitiveDataArrayAsString: [
		{
			email: "[REDACTED]",
			dontReactMe: "123456",
		},
	],
	sensitiveDataObjectWithStringObjects: {
		email: {
			email: "[REDACTED]",
		},
		password: {
			password: "[REDACTED]",
		},
		dontRedactMe: {
			dontRedactMe: "123456",
		},
	},
	email: "[REDACTED]",
};

export const blackList = ["email", "password"];
