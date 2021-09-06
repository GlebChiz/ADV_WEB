/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store';
import { tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { InsuranceTableActions } from './insurance-table.actions';

const tableReducers: any = tableReducersFactory(
	InsuranceTableActions.UpdateInsuranceTableState,
	InsuranceTableActions.GetInsuranceTableDataPending,
	InsuranceTableActions.GetCurrentItemSuccess,
	InsuranceTableActions.GetInsuranceTableDataError,
	InsuranceTableActions.GetInsuranceTableDataSuccess,
	InsuranceTableActions.ClearCurrentInsurance,
);

export function insuranceTableReducers(state: any | undefined, action: Action): any {
	return tableReducers(state, action);
}

export function patientInsuranceReducers(
	assessmentLegendTranlsatedState: any | undefined,
	action: Action,
): any {
	return createReducer(
		{},
		on(
			InsuranceTableActions.GetCurrentInsuranceSuccess,
			(state: any, { insurance }: { insurance: any }) => ({
				...state,
				insurance,
			}),
		),
	)(assessmentLegendTranlsatedState, action);
}

export const insuranceReducers: any = {
	table: insuranceTableReducers,
	insurance: patientInsuranceReducers,
};
