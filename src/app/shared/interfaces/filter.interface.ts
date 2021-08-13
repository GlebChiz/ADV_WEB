export interface IGridFilter {
	Skip: number;
	PageSize: number;
}

export interface IGridFilterModel {
	[key: string]: { type: number; isNegative: boolean; value?: any; date?: string };
}

export interface IGridFilterType {
	type: number;
	isNegative: boolean;
	value?: string;
}

export const enum StringOperationFilter {
	Equal = 'eq',
	NotEqual = 'neq',
	Contains = 'contains',
	DoesNotContain = 'doesnotcontain',
	Startswith = 'startswith',
	Endswith = 'endswith',
	IsEmpty = 'isempty',
	IsNotEmpty = 'isnotempty',
}

export const enum DateOperationFilter {
	Equal = 'eq',
	NotEqual = 'neq',
	AfterOrEqual = 'gte',
	After = 'gt',
	BeforeOrEqual = 'lte',
	Before = 'lt',
}

export const enum NumberOperationFilter {
	Equal = 'eq',
	NotEqual = 'neq',
	GreaterThanOrEqual = 'gte',
	GreaterThan = 'gt',
	LessThanOrEqual = 'lte',
	LessThan = 'lt',
}

export const enum BooleanOperationFilter {
	IsTrue = 'eq',
	IsFalse = 'eq',
}

export enum ColumnFilterDataType {
	String = 'string',
	Boolean = 'boolean',
	Number = 'number',
}
