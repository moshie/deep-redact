import { parse } from "relaxed-json";

export const safelyParseRelaxedJson = (str: string) => {
	try {
		return parse(str);
	} catch {
		return false;
	}
};
