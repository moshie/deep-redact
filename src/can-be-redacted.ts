import type { CanBeRedactedArgs } from "./types";
import { isPlainObject } from "./is-plain-object";

export const canBeRedacted = ({ key, value, list }: CanBeRedactedArgs) =>
	typeof list.find((listKey) => listKey.toLowerCase() === key.toLowerCase()) !==
		"undefined" &&
	!isPlainObject(value) &&
	typeof value !== "symbol";
