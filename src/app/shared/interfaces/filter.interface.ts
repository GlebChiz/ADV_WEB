export interface IGridFilter {
	Skip: number;
	PageSize: number;
}

export interface IGridFilterModel {
	[key: string]: { type: number; isNegative: boolean; value: string };
}

export interface IGridFilterType {
	type: number;
	isNegative: boolean;
	value?: string;
}
