/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer } from '@ngrx/store';
import { tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { PatientDistributionTableActions } from './patient-distribution-table.actions';

const tableReducers: any = tableReducersFactory(
	PatientDistributionTableActions.UpdatePatientDistributionTableState,
	PatientDistributionTableActions.GetPatientDistributionTableDataPending,
	PatientDistributionTableActions.GetCurrentItemSuccess,
	PatientDistributionTableActions.GetPatientDistributionTableDataError,
	PatientDistributionTableActions.GetPatientDistributionTableDataSuccess,
	PatientDistributionTableActions.ClearCurrentPatientDistribution,
);

export function patientDistributionTableReducers(state: any | undefined, action: Action): any {
	return tableReducers(state, action);
}

export function patientDistributionInfoReducers(
	patientDistributionState: any,
	action: Action,
): any {
	return createReducer({})(patientDistributionState, action);
}

export const patientDistributionReducers: any = {
	table: patientDistributionTableReducers,
	patientDistributionInfo: patientDistributionInfoReducers,
};
