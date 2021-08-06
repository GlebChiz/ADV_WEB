/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from '@ngrx/store';
import { tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { getPatientTableDataPending } from './patient-table.actions';

const tableReducers: any = tableReducersFactory(getPatientTableDataPending);

export function patientTableReducers(state: any | undefined, action: Action): any {
	return tableReducers(state, action);
}