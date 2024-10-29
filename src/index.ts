import { replacer } from "./replacer";
import type { RedactOptions, Data } from "./types";

export const redact = (data: Data, options: RedactOptions) => {
	const { list = [], strict = false } = options;

	/**
	 * Handle empty list
	 */
	if (list.length === 0) {
		return data;
	}

	try {
		const raw = JSON.stringify(data, replacer(options));
		return JSON.parse(raw);
	} catch (e) {
		if (strict) {
			throw e;
		}
		console.log("[CIRCULAR]");
		return data;
	}
};
