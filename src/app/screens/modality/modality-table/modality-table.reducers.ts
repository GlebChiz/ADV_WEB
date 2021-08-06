/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from '@ngrx/store';
import { tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { getModalityTableDataPending } from './modality-table.actions';

const tableReducers: any = tableReducersFactory(getModalityTableDataPending);

export function modalityTableReducers(state: any | undefined, action: Action): any {
	return tableReducers(state, action);
}
