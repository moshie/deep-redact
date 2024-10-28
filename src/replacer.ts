import { redact } from ".";
import type { RedactOptions } from "./types";
import { isPlainObject } from "./is-plain-object";
import { canBeRedacted } from "./can-be-redacted";

export const replacer =
	(options: RedactOptions) => (_key: string, data: any) => {
		const { list = [], redactString = "[REACTED]" } = options;

		if (Array.isArray(data)) {
			return data;
		}

		/**
		 * Handle Plain Object
		 */
		if (isPlainObject(data)) {
			for (const [k, value] of Object.entries(data)) {
				data[k] = canBeRedacted({ key: k, value, list }) ? redactString : value;
			}
			return data;
		}

		/**
		 * Handle Map
		 */
		if (data instanceof Map) {
			const obj = Object.fromEntries(data.entries());
			for (const [k, value] of Object.entries(obj)) {
				obj[k] = canBeRedacted({ key: k, value, list }) ? redactString : value;
			}

			return obj;
		}

		/**
		 * Handle Set
		 */
		if (data instanceof Set) {
			return redact(Array.from(data), options);
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
			if (data instanceof Date || data instanceof RegExp) {
				return data;
			}

			// Some other object? a class instance WRAP THIS IN A TRY CATCH!
			try {
				// Move this out to a function called safelyConvertClassInstanceToPlainObject
				const convertedClassInstanceToPlainObject = JSON.parse(
					JSON.stringify(data),
				);
				return redact(convertedClassInstanceToPlainObject, options);
			} catch (e) {
				return data;
			}
		}

		// Handle strings:
		// stringified objects
		// urls
		// html
		// yaml
		// XML
		// etc

		return data;
	};
