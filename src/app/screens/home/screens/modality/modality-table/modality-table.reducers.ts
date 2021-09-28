/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { ITableState, tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { ModalityTableActions } from './modality-table.actions';

const tableReducers: ActionReducer<ITableState<any, any, any>> = tableReducersFactory(
	ModalityTableActions.UpdateModalityTableState,
	ModalityTableActions.GetModalityTableDataPending,
	ModalityTableActions.GetCurrentItemSuccess,
	ModalityTableActions.GetModalityTableDataError,
	ModalityTableActions.GetModalityTableDataSuccess,
	ModalityTableActions.ClearCurrentModality,
);

export interface IModalityTableReducers {
	table: ITableState<any, any, any>;
}

export const modalityReducers: ActionReducerMap<IModalityTableReducers> = {
	table: tableReducers,
};
