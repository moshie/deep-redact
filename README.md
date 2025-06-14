# `deep-redact`

Deep redact is a package that recursively redacts sensitive data from JavaScript primitives based on a list of keys.

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
    jsonString: '{ "email": "hello@test.com"}',
    url: "https://cv.moshie.dev/redactor?this=test&password=12345&email=hello@test.com",
};

const result = redact(data, {
    list: ["email", "password"],
    strict: true,
    redactString: "[REDACTED]",
});

console.log(result);
/**
 * {
 *   email: "[REDACTED]",
 *   password: "[REDACTED]",
 *   dontReactMe: "123456",
 *   jsonString: {
 *     email: "[REDACTED]"
 *   },
 *   url: "https://cv.moshie.dev/redactor?email=[REDACTED]&password=[REDACTED]&this=test"
 * }
 */
```

## Replacer

We also expose a replacer function that can be used with `JSON.stringify` and `JSON.parse` the redactor does this behind the scenes but you can use it if you want to.

```ts
import { replacer } from "deep-redact";

const data = {
    email: "hello@test.com",
    password: "123456",
    dontReactMe: "123456",
};

const replacer = replacer({
    list: ["email", "password"],
    strict: true,
    redactString: "[REDACTED]",
})

try {
    const raw = JSON.stringify(data, replacer);

    const result = JSON.parse(raw);

    console.log(result);
    /**
     * "{
     *   "email": "[REDACTED]",
     *   password: "[REDACTED]",
     *   dontReactMe: "123456",
     * }"
     */
} catch (e) {
    console.log(e);
}
```

## Options

`redactString` - The string to replace the redacted data with. Default is `[REDACTED]`.

`list` - An array of keys to redact. Default is `[]`.

`strict` - A boolean to determine if the data should throw an error or not. Default is `false`.

## Benchmark

We have a benchmark that runs the redaction function and outputs the results to github pages.

[See the results here](https://moshie.github.io/deep-redact/dev/bench/)