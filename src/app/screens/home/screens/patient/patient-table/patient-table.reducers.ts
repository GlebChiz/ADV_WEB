/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store';
import { IPatientGeneralInfo } from 'src/app/shared/components/patient-general-info/patient-general-info.component';
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

export function patientInfoReducers(patientInfoState: any | undefined, action: Action): any {
	return createReducer(
		{},
		on(
			PatientTableActions.GetPatientGeneralInfoSuccess,
			(state: any, { patientInfo }: { patientInfo: IPatientGeneralInfo }) => ({
				...state,
				...patientInfo,
			}),
		),
	)(patientInfoState, action);
}

export const patientReducers: any = {
	table: patientTableReducers,
	patientInfo: patientInfoReducers,
};
