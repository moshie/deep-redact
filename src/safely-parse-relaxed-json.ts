import relaxedJson from "@fregante/relaxed-json";
import { startsLikeJson } from "./may-hold-redactable-data";

export const safelyParseRelaxedJson = (str: string) => {
	// Skip the parse for strings that can't be an object or array, such as
	// query strings that reach here because they contain `=`
	if (!startsLikeJson(str)) {
		return false;
	}

	try {
		const obj = relaxedJson.parse(str);

		if (typeof obj !== "object") {
			return false;
		}

		return obj;
	} catch {
		return false;
	}
};
