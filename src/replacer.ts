import { redact } from ".";
import queryString from "query-string";
import { isPlainObject } from "./is-plain-object";
import { canBeRedacted } from "./can-be-redacted";
import type { RedactOptions, Data } from "./types";
import { safelyParseUrl } from "./safely-parse-url";
import { safelyConvertToObject } from "./safely-convert-to-object";
import { safelyParseRelaxedJson } from "./safely-parse-relaxed-json";

export const replacer =
	(options: RedactOptions) => (_key: string, data: Data) => {
		const { list = [], redactString = "[REDACTED]" } = options;

		/**
		 * If the data has already been redacted we don't want to
		 * try and convert it to an array by mistake i.e [REDACTED]
		 */
		if (typeof data === "string" && data === redactString) {
			return data;
		}

		/**
		 * If the string can be converted to a number we return it back as a string
		 * so json parse doesn't get a hold of it and convert it to a number
		 */
		if (typeof data === "string" && !Number.isNaN(Number.parseInt(data))) {
			return data;
		}

		/**
		 * Return Arrays
		 */
		if (Array.isArray(data)) {
			return data;
		}

		/**
		 * Convert Map to object or Set to Array
		 */
		if (data instanceof Map || data instanceof Set) {
			return redact(
				data instanceof Set ? Array.from(data) : Object.fromEntries(data),
				options,
			);
		}

		/**
		 * Handle Strings, HTML, JSON, YML, URLs etc
		 */
		if (typeof data === "string") {
			// IS RELAXED JSON?
			const obj = safelyParseRelaxedJson(data);

			if (obj) {
				return redact(obj, options);
			}

			// IS URL?
			const result = safelyParseUrl(data);

			if (typeof result !== "string") {
				if (result.parsedUrl) {
					const clone = { ...result.parsedUrl };
					clone.query = redact(result.parsedUrl.query, options);

					return queryString.stringifyUrl(clone);
				}

				if (result.parsedQuery) {
					const clone = redact(result.parsedQuery, options);

					return queryString.stringify(clone);
				}
			}

			return data;
		}

		/**
		 * Handle Plain Object
		 */
		if (isPlainObject(data)) {
			for (const key in data) {
				// the key could be blacklisted but the data[key] could be json
				if (typeof data[key] === "string" && data[key] !== redactString) {
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
			const obj = safelyConvertToObject(data);

			if (!obj) {
				return data;
			}

			return redact(obj, options);
		}

		return data;
	};
