/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createReducer, on } from '@ngrx/store';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { IColumn } from '../interfaces/column.interface';

export const initialState: any = [];

export function tableReducersFactory(
	updateTableState: any,
	getTableDataPending: any,
	getCurrentItemSuccess: any,
	getTableDataError: any,
	getTableDataSuccess: any,
	clearCurrentItem: any,
): any {
	return createReducer(
		initialState,
		on(updateTableState, (state: any, payload: any) => {
			return { ...state, ...payload.data };
		}),
		on(getCurrentItemSuccess, (state: any, payload: any) => {
			return { ...state, current: payload.item };
		}),
		// on(getCurrentItemSuccess, (state: any, payload: any) => {
		// 	return { ...state, current: payload.item };
		// }),
		on(getTableDataPending, (state: any, payload: any) => {
			return {
				...state,
				isLoading: true,
				controller: payload.controller,
				filter: payload.filter,
				columns: payload.columns,
			};
		}),
		on(getTableDataError, (state: any) => {
			return { ...state, isLoading: false };
		}),
		on(clearCurrentItem, (state: any) => {
			return { ...state, current: null };
		}),
		on(getTableDataSuccess, (state: any) => {
			return { ...state, isLoading: false };
		}),
	);
}

export interface ITableState<T, R> {
	isLoading: boolean;
	controller: string;
	filter: CompositeFilterDescriptor;
	columns: IColumn[];
	current?: R;
	data: T[];
	totla: number;
}
