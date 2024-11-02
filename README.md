# `deep-redact`

Deep redact is a library that allows you to redact sensitive data from objects. It uses a list of keys to redact the data and supports strict mode to throw an error if the data is not redacted.

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
});

console.log(result);
// { email: "[REDACTED]", password: "[REDACTED]", dontReactMe: "123456" }
```

## Options

`redactString` - The string to replace the redacted data with. Default is `[REDACTED]`.

`list` - An array of keys to redact. Default is `[]`.

`strict` - A boolean to determine if the data should be redacted or not. Default is `false`.
