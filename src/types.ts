export type List = string[];

export type RedactOptions = {
    list?: List;
    redactString?: string;
}

export type CanBeRedactedArgs = {
    key: string;
    value: any;
    list: List;
}