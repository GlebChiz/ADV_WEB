export interface ColumnFilter {
	column: string;
	data: any;
	type: ColumnFilterType;
	dataType: ColumnFilterDataType;
}
export interface ColumnSort {
	order: number;
	column: string;
	direction: SortDirection;
}

export enum SortDirection {
	None = 0,
	Asc = 1,
	Desc = 2,
}
export enum ColumnFilterDataType {
	String = 0,
	Date = 1,
	Interval = 2,
}
export enum ColumnFilterType {
	None = 0,
	Equal = 1,
	Contains = 2,
	StartsWith = 3,
	EndsWith = 4,
	More = 5,
	Less = 6,
	MoreEqual = 7,
	LessEqual = 8,
	Between = 9,
	Empty = 10,
}

export const ColumnFilterTypeNames = [
	'',
	'Equals',
	'Contains',
	'Starts With',
	'Ends With',
	'More Than',
	'Less',
	'More Than or Equals',
	'Less Than or Equals',
	'Between',
	'Empty',
];

export interface StringSubFilter {
	type: ColumnFilterType;
	value: string;
}

export interface DateSubFilter {
	type: ColumnFilterType;
	date: Date;
}
export interface IntervalSubFilter {
	type: ColumnFilterType;
	from: Date;
	to: Date;
}
