import Benchmark from "benchmark";
import { redact } from "./dist/index.js";

const data = {
	email: "hello@test.com",
	password: "123456",
	dontReactMe: "123456",
	jsonString: '{ "email": "hello@test.com"}',
	url: "https://cv.moshie.dev/redactor?this=test&password=12345&email=hello@test.com",
};

const suite = new Benchmark.Suite();

suite
	.add("Redact#redact", () => {
		redact(data, {
			list: ["email", "password"],
			redactString: "[REDACTED]",
		});
	})
	.on("cycle", (event) => {
		console.log(String(event.target));
	})
	.run({ async: true });
