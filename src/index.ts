import { replacer as replace } from "./replacer";
import type { Data, RedactOptions } from "./types";

export const redact = (data: Data, options: RedactOptions) => {
	const { list = [], strict = false } = options;

	/**
	 * Handle empty list
	 */
	if (list.length === 0) {
		return data;
	}

	try {
		const raw = JSON.stringify(data, replace(options));
		return JSON.parse(raw);
	} catch (e) {
		if (strict) {
			throw e;
		}

		return data;
	}
};

export const replacer = replace;
