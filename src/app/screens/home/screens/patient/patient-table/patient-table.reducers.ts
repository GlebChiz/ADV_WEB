/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from '@ngrx/store';
import { tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { PatientTableActions } from './patient-table.actions';

const tableReducers: any = tableReducersFactory(
	PatientTableActions.UpdatePatientTableState,
	PatientTableActions.GetPatientTableDataPending,
	PatientTableActions.GetCurrentItemSuccess,
	PatientTableActions.GetPatientTableDataError,
	PatientTableActions.GetPatientTableDataSuccess,
	PatientTableActions.ClearCurrentPatient,
);

export function patientTableReducers(state: any | undefined, action: Action): any {
	return tableReducers(state, action);
}
