/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store';
import { IClinicianGeneralInfo } from 'src/app/shared/components/clinician-general-info/clinician-general-info.component';
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

export function clinicianInfoReducers(clinicianInfoState: any | undefined, action: Action): any {
	return createReducer(
		undefined,
		on(
			ClinicianTableActions.GetClinicianGeneralInfoSuccess,
			(state: any, { clinicianInfo }: { clinicianInfo: IClinicianGeneralInfo }) => ({
				...state,
				...clinicianInfo,
			}),
		),
	)(clinicianInfoState, action);
}

export const clinicianReducers: any = {
	table: clinicianTableReducers,
	clinicianInfo: clinicianInfoReducers,
};
