export const safelyConvertToObject = (data: object): boolean | object => {
	try {
		const raw = JSON.stringify(data);
		return JSON.parse(raw);
	} catch (error) {
		return false;
	}
};
