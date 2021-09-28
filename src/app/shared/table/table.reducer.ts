/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionCreator, ActionReducer, createReducer, on } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { IColumn } from '../interfaces/column.interface';
import { IFilter } from './table.model';

export const initialState: ITableState<any, any, any> = {};

// eslint-disable-next-line @typescript-eslint/ban-types
export type TableAction<T extends object> = ActionCreator<string, (props: T) => T>;
export type TableTypedAction = ActionCreator<string, () => TypedAction<string>>;

export function tableReducersFactory(
	updateTableState: TableAction<{ data: any }>,
	getTableDataPending: TableAction<{
		controller: string;
		filter: IFilter;
		columns: IColumn[];
		gridId: string;
	}>,
	getCurrentItemSuccess: TableAction<{ item: any }>,
	getTableDataError: TableTypedAction,
	getTableDataSuccess: TableTypedAction,
	clearCurrentItem: TableTypedAction,
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
