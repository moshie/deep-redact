import { replacer } from "./replacer";
import type { RedactOptions } from "./types";

export const redact = (data: any, options: RedactOptions) => {
    /**
     * Handle empty list
     */
    if (options?.list?.length === 0) {
        return data;
    }

    try {
        const raw = JSON.stringify(data, replacer(options));
        return JSON.parse(raw);
    } catch (e) {
        // TODO: HANDLE UNHANDLED OBJECT
        console.error(e);
        return '[CIRCULAR]';
    }
}