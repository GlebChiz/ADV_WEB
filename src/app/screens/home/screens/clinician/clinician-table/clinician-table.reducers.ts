/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from '@ngrx/store';
import { tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { ClinicianTableActions } from './clinician-table.actions';

const tableReducers: any = tableReducersFactory(
	ClinicianTableActions.UpdateClinicianTableState,
	ClinicianTableActions.GetClinicianTableDataPending,
	ClinicianTableActions.GetCurrentItemSuccess,
	ClinicianTableActions.GetClinicianTableDataError,
	ClinicianTableActions.GetClinicianTableDataSuccess,
	ClinicianTableActions.ClearCurrentClinician,
);

export function clinicianTableReducers(state: any | undefined, action: Action): any {
	return tableReducers(state, action);
}
