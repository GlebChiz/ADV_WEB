/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionCreator, ActionReducer, createReducer, on } from '@ngrx/store';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { IColumn } from '../interfaces/column.interface';

export const initialState: ITableState<any, any, any> = {};

// eslint-disable-next-line @typescript-eslint/ban-types
export type TableActionCreator<T extends object> = ActionCreator<string, (props: T) => T>;

export interface ICurrentItem<T> {
	item: T;
}

export function tableReducersFactory(
	updateTableState: TableActionCreator<{ data: any }>,
	getTableDataPending: TableActionCreator<any>,
	getCurrentItemSuccess: TableActionCreator<ICurrentItem<any>>,
	getTableDataError: TableActionCreator<any>,
	getTableDataSuccess: TableActionCreator<any>,
	clearCurrentItem: TableActionCreator<any>,
): ActionReducer<ITableState<any, any, any>> {
	return createReducer(
		initialState,
		on(updateTableState, (state: ITableState<any, any, any>, payload: { data: any }) => {
			return { ...state, ...payload.data };
		}),
		on(getCurrentItemSuccess, (state: ITableState<any, any, any>, payload: { item: any }) => {
			return { ...state, current: payload.item };
		}),
		on(getTableDataPending, (state: ITableState<any, any, any>, payload: any) => {
			return {
				...state,
				isLoading: true,
				controller: payload.controller,
				filter: payload.filter,
				columns: payload.columns,
				title: payload.title,
			};
		}),
		on(getTableDataError, (state: ITableState<any, any, any>) => {
			return { ...state, isLoading: false };
		}),
		on(clearCurrentItem, (state: ITableState<any, any, any>) => {
			return { ...state, current: null };
		}),
		on(getTableDataSuccess, (state: ITableState<any, any, any>) => {
			return { ...state, isLoading: false };
		}),
	);
}

export interface ITableState<T, R, A> {
	table?: ITable<T, R>;
	additional?: A;
}

export type ITableStateAny = ITableState<any, any, any>;

export interface ITable<T, R> {
	isLoading: boolean;
	controller: string;
	filter: CompositeFilterDescriptor;
	columns: IColumn[];
	current?: R;
	data: T[];
	total: number;
	title?: string;
}
