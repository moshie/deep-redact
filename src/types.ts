export type DataTypes =
	| string
	| object
	| symbol
	| boolean
	| bigint
	| undefined
	| null
	| number;

export type Data = DataTypes[] | DataTypes;

export type List = string[];

export type RedactOptions = {
	list?: List;
	strict?: boolean;
	redactString?: string;
};

export type CanBeRedactedArgs = {
	key: string;
	value: DataTypes;
	list: List;
};
