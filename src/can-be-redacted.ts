import { isPlainObject } from "./is-plain-object";
import type { CanBeRedactedArgs } from "./types";


// TODO maybe you can pass your own redactFunction?
export const canBeRedacted = ({
    key,
    value,
    list
}: CanBeRedactedArgs) => list.filter((listKey) => listKey.toLowerCase() === key.toLowerCase()).length > 0 && !isPlainObject(value) && typeof value !== 'symbol';
