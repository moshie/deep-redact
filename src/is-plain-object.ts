import type { Data, DataTypes } from "./types";

export const isPlainObject = (obj: Data): obj is Record<string, DataTypes> =>
	obj !== null &&
	typeof obj === "object" &&
	[null, Object.prototype].includes(Object.getPrototypeOf(obj));
