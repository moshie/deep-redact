import { redact } from ".";
import { isPlainObject } from "./is-plain-object";
import { canBeRedacted } from "./can-be-redacted";
import type { RedactOptions, Data } from "./types";
import { safelyConvertToObject } from "./safely-convert-to-object";

export const replacer =
	(options: RedactOptions) => (_key: string, data: Data) => {
		const { list = [], redactString = "[REACTED]" } = options;

		/**
		 * Return Arrays
		 */
		if (Array.isArray(data)) {
			return data;
		}

		/**
		 * Convert Map to Object
		 */
		if (data instanceof Map) {
			return redact(Object.fromEntries(data), options);
		}

		/**
		 * Convert Set to Array
		 */
		if (data instanceof Set) {
			return redact(Array.from(data), options);
		}

		/**
		 * Handle Plain Object
		 */
		if (isPlainObject(data)) {
			for (const key in data) {
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

		// Handle strings:
		// stringified objects
		// urls
		// html
		// yaml
		// XML
		// file paths e.g /Users/[REDACTED]/documents
		// etc

		return data;
	};
