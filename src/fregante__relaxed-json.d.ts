// @fregante/relaxed-json ships no types; these follow @types/relaxed-json,
// which described the same API under the original package name.
declare module "@fregante/relaxed-json" {
	export type Reviver = (key: string, value: unknown) => unknown;
	export function transform(text: string): string;
	export function parse(text: string, reviver: Reviver): unknown;
	export function parse(
		text: string,
		opts?: {
			reviver?: Reviver | undefined;
			relaxed?: boolean | undefined;
			warnings?: boolean | undefined;
			tolerant?: boolean | undefined;
			duplicate?: boolean | undefined;
		},
	): unknown;
	export function stringify(obj: unknown): string;
}
