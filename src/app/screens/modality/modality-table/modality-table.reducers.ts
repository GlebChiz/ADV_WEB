/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from '@ngrx/store';
import { tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { updateModalityTableState } from './modality-table.actions';

const tableReducers: any = tableReducersFactory(updateModalityTableState);

export function modalityTableReducers(state: any | undefined, action: Action): any {
	return tableReducers(state, action);
}
