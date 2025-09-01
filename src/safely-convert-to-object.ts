export const safelyConvertToObject = (
	data: object | null,
): boolean | object => {
	try {
		const raw = JSON.stringify(data);
		return JSON.parse(raw);
	} catch (_error) {
		return false;
	}
};
