/* eslint-disable @typescript-eslint/no-explicit-any */
import { createReducer, on } from '@ngrx/store';

export const initialState: number[] = [];

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function tableReducersFactory(updateTableState: any): any {
	return createReducer(
		initialState,
		// on(getTableDataPending, (state: any, { data }: { data: [] }) => {
		// return [...state, ...data];
		// }),
		on(updateTableState, (_state: number[]) => {
			console.log(_state);
			return [1, 2, 3];
		}),
		// on(clearTable, (state: any, { field }) => {
		// 	return { ...state, [field]: undefined };
		// }),
	);
}
