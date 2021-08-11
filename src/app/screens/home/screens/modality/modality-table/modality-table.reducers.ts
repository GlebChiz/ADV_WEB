/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from '@ngrx/store';
import { tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { ModalityTableActions } from './modality-table.actions';

const tableReducers: any = tableReducersFactory(
	ModalityTableActions.UpdateModalityTableState,
	ModalityTableActions.GetModalityTableDataPending,
	ModalityTableActions.GetCurrentItemSuccess,
	ModalityTableActions.GetModalityTableDataError,
	ModalityTableActions.GetModalityTableDataSuccess,
);

export function modalityTableReducers(state: any | undefined, action: Action): any {
	return tableReducers(state, action);
}
