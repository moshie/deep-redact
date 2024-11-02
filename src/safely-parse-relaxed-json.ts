import { parse } from "relaxed-json";

export const safelyParseRelaxedJson = (str: string) => {
	try {
		const obj = parse(str);

		if (typeof obj !== "object") {
			return false;
		}

		return obj;
	} catch {
		return false;
	}
};
