export const isPlainObject = (obj: object) => (
    obj !== null &&
    typeof obj === 'object' &&
    [null, Object.prototype].includes(Object.getPrototypeOf(obj))
);