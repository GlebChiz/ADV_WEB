/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createReducer, on } from '@ngrx/store';

export const initialState: any = [];

export function tableReducersFactory(
	updateTableState: any,
	getTableDataPending: any,
	getCurrentItemSuccess: any,
	getTableDataError: any,
	getTableDataSuccess: any,
): any {
	return createReducer(
		initialState,
		on(updateTableState, (state: any, payload: any) => {
			return { ...state, ...payload.data };
		}),
		on(getCurrentItemSuccess, (state: any, payload: any) => {
			return { ...state, current: payload.item };
		}),
		on(getTableDataPending, (state: any, payload: any) => {
			return { ...state, isLoading: true, controller: payload.controller, filter: payload.filter };
		}),
		on(getTableDataError, (state: any) => {
			return { ...state, isLoading: false };
		}),
		on(getTableDataSuccess, (state: any) => {
			return { ...state, isLoading: false };
		}),
	);
}
