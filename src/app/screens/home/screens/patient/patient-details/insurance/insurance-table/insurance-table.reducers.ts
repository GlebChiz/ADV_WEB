/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from '@ngrx/store';
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
