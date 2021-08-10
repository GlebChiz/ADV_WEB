/* eslint-disable @typescript-eslint/no-explicit-any */
import { createReducer, on } from '@ngrx/store';

export const initialState: any = [];

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function tableReducersFactory(updateTableState: any, getTableDataPending: any): any {
	// return createReducer(
	// 	initialChecklistState,
	// 	on(ChecklistActions.SetChecklist, (state: IChecklistState, payload) => {
	// 		const newState: IChecklistState = { ...state };
	// 		newState.checklists[payload.checklist.id.toString()] = payload.checklist;
	// 		return newState;
	// 	}),
	// )(checklistState, action);
	return createReducer(
		initialState,
		// on(getTableDataPending, (state: any, { data }: { data: [] }) => {
		// return [...state, ...data];
		// }),
		on(updateTableState, (state: any, payload: any) => {
			return { ...state, ...payload.data };
		}),
		on(updateTableState, (state: any, payload: any) => {
			return { ...state, currenrt: payload.item };
		}),
		on(getTableDataPending, (state: any, payload: any) => {
			return { ...state, isLoading: true, controller: payload.controller, filter: payload.filter };
		}),
		// on(clearTable, (state: any, { field }) => {
		// 	return { ...state, [field]: undefined };
		// }),
	);
}
