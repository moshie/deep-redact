import { redact } from ".";
import { isPlainObject } from "./is-plain-object";
import { canBeRedacted } from "./can-be-redacted";
import type { RedactOptions, Data } from "./types";
import { safelyConvertToObject } from "./safely-convert-to-object";
import { safelyParseRelaxedJson } from "./safely-parse-relaxed-json";

export const replacer =
	(options: RedactOptions) => (_key: string, data: Data) => {
		const { list = [], redactString = "[REDACTED]" } = options;

		console.log("START REPLACE", data, typeof data);

		/**
		 * If the data has already been redacted we don't want to
		 * try and convert it to an array by mistake i.e [REDACTED]
		 */
		if (typeof data === "string" && data === redactString) {
			console.log("SKIPPING REDACT STRING");
			return data;
		}

		/**
		 * If the string can be converted to a number we return it back as a string
		 * so json parse doesn't get a hold of it and convert it to a number
		 */
		if (typeof data === "string" && !Number.isNaN(Number.parseInt(data))) {
			console.log(
				"IS STRING CONVERTABLE TO NUMBER",
				data,
				Number.parseInt(data),
			);
			return data;
		}

		/**
		 * Handle Strings, HTML, JSON, YML, URLs etc
		 */
		if (typeof data === "string") {
			console.log("IS STRING", data, typeof data);

			// Handle strings:
			// stringified objects relaxed json
			// urls
			// html
			// yaml
			// XML
			// file paths e.g /Users/[REDACTED]/documents
			// etc

			const obj = safelyParseRelaxedJson(data);

			if (obj) {
				return redact(obj, options);
			}

			console.log("SKIPPING", data);
		}

		/**
		 * Return Arrays
		 */
		if (Array.isArray(data)) {
			console.log("IS ARRAY", data, typeof data);
			return data;
		}

		/**
		 * Convert Map to object or Set to Array
		 */
		if (data instanceof Map || data instanceof Set) {
			console.log("IS MAP or Set", data, typeof data);
			return redact(
				data instanceof Set ? Array.from(data) : Object.fromEntries(data),
				options,
			);
		}

		/**
		 * Handle Plain Object
		 */
		if (isPlainObject(data)) {
			console.log("IS PLAIN OBJECT", data, typeof data);
			for (const key in data) {
				// the key could be blacklisted but the data[key] could be json
				if (typeof data[key] === "string" && data[key] !== redactString) {
					console.log("STRING DATA");
					data[key] = redact(data[key], options);
				}

				data[key] = canBeRedacted({ key, value: data[key], list })
					? redactString
					: data[key];
			}

			return data;
		}

		// TODO:
		// Handle WeakMaps
		// Handle WeakSets
		// Handle Symbols
		// Handle Number & BigInt
		// Handle Functions

		/**
		 * handle other object types
		 *
		 * Date, RegExp, class
		 */
		if (typeof data === "object") {
			console.log("IS SOME OTHER OBJECT", data, typeof data);
			const obj = safelyConvertToObject(data);

			console.log("THING", obj);

			if (!obj) {
				return data;
			}

			return redact(obj, options);
		}

		return data;
	};
