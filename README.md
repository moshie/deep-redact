# `deep-redact`

Deep redact is a package that recursively redacts sensitive data from JavaScript primitives based on a list of keys.

> ⚠️ This package is ESM only.

## Features

- Redaction of data from strings, objects, classes, maps, sets, arrays, and symbols
- Supports strict mode to throw an error or return original data in the event of an error.
- Redact data from JSON strings
- Redact data from URLs

## Installation

```bash
npm install deep-redact
```

## Usage

```ts
import { redact } from "deep-redact";

const data = {
	email: "hello@test.com",
	password: "123456",
	dontReactMe: "123456",
};

const result = redact(data, {
	list: ["email", "password"],
    strict: true,
    redactString: "[REDACTED]",
    jsonString: '{ "email": "hello@test.com"}',
    url: "https://cv.moshie.dev/redactor?this=test&password=12345&email=hello@test.com",
});

console.log(result);
// { email: "[REDACTED]", password: "[REDACTED]", dontReactMe: "123456", jsonString: { email: "[REDACTED]"}, url: "https://cv.moshie.dev/redactor?email=%5BREDACTED%5D&password=%5BREDACTED%5D&this=test" }
```

## Options

`redactString` - The string to replace the redacted data with. Default is `[REDACTED]`.

`list` - An array of keys to redact. Default is `[]`.

`strict` - A boolean to determine if the data should be redacted or not. Default is `false`.