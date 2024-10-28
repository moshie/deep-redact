import { canBeRedacted } from "./can-be-redacted";

class TestClass { }

test.each([
    [{ key: 'email', value: 'password', list: ['email'] }, true],
    [{ key: 'email', value: 'password', list: ['password'] }, false],
    [{ key: 'EMAIL', value: 'password', list: ['email'] }, true],
    [{ key: 'email', value: 'password', list: ['EMAIL'] }, true],
    [{ key: 'email', value: {}, list: ['email'] }, false],
    [{ key: 'email', value: null, list: ['email'] }, true],
    [{ key: 'email', value: /Regex/, list: ['email'] }, true],
    [{ key: 'email', value: 0, list: ['email'] }, true],
    [{ key: 'email', value: false, list: ['email'] }, true],
    [{ key: 'email', value: undefined, list: ['email'] }, true],
    [{ key: 'email', value: BigInt(Number.MAX_SAFE_INTEGER), list: ['email'] }, true],
    [{ key: 'email', value: Symbol("foo"), list: ['email'] }, false],
    [{ key: 'email', value: () => { }, list: ['email'] }, true],
    [{ key: 'email', value: new TestClass(), list: ['email'] }, true],
])(`canBeRedacted(%o) -> %s`, (options, expected) => {
    expect(canBeRedacted(options)).toBe(expected);
})