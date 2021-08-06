/* eslint-disable @typescript-eslint/no-explicit-any */
import { createReducer, on } from '@ngrx/store';

export const initialState: any = [];

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function tableReducersFactory(updateTableState: any): any {
	return createReducer(
		initialState,
		// on(getTableDataPending, (state: any, { data }: { data: [] }) => {
		// return [...state, ...data];
		// }),
		on(updateTableState, (_state: number[], payload: any) => {
			// on(CallActions.SetCall, (state, payload) => {
			// return { ...state, call: payload.call };
			// }),
			// console.log(_state);
			// console.log(updateTableState);
			// console.log(payload);

			return payload.data;
		}),
		// on(clearTable, (state: any, { field }) => {
		// 	return { ...state, [field]: undefined };
		// }),
	);
}
