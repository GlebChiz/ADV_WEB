/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, ActionReducerMap } from '@ngrx/store';
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

export interface IModalityReducers {
	table: any;
}

export const modalityReducers: ActionReducerMap<IModalityReducers> = {
	table: modalityTableReducers,
};
