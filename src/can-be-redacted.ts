import { isPlainObject } from "./is-plain-object";
import type { CanBeRedactedArgs } from "./types";

export const canBeRedacted = ({
	key,
	value,
	list,
	normalizedList,
}: CanBeRedactedArgs) => {
	// Early exit for plain objects and symbols
	if (isPlainObject(value) || typeof value === "symbol") {
		return false;
	}

	const keyLower = key.toLowerCase();

	// Use Set for O(1) lookup if available, otherwise fallback to array
	if (normalizedList) {
		return normalizedList.has(keyLower);
	}

	// Fallback for backwards compatibility
	return list.some((listKey) => listKey.toLowerCase() === keyLower);
};
