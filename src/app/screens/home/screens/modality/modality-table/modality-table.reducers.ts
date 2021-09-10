/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer } from '@ngrx/store';
import { tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { ModalityTableActions } from './modality-table.actions';

const tableReducers: any = tableReducersFactory(
	ModalityTableActions.UpdateModalityTableState,
	ModalityTableActions.GetModalityTableDataPending,
	ModalityTableActions.GetCurrentItemSuccess,
	ModalityTableActions.GetModalityTableDataError,
	ModalityTableActions.GetModalityTableDataSuccess,
	ModalityTableActions.ClearCurrentModality,
);

export function modalityTableReducers(state: any | undefined, action: Action): any {
	return tableReducers(state, action);
}

export function modalityInfoReducers(modalityState: any, action: Action): any {
	return createReducer({})(modalityState, action);
}

export const modalityReducers: any = {
	table: modalityTableReducers,
	modalityInfo: modalityInfoReducers,
};
