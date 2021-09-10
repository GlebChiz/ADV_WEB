/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer } from '@ngrx/store';
import { tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { PayerTableActions } from './payer-table.actions';

const tableReducers: any = tableReducersFactory(
	PayerTableActions.UpdatePayerTableState,
	PayerTableActions.GetPayerTableDataPending,
	PayerTableActions.GetCurrentItemSuccess,
	PayerTableActions.GetPayerTableDataError,
	PayerTableActions.GetPayerTableDataSuccess,
	PayerTableActions.ClearCurrentPayer,
);

export function payerTableReducers(state: any | undefined, action: Action): any {
	return tableReducers(state, action);
}

export function payerInfoReducers(payerState: any, action: Action): any {
	return createReducer({})(payerState, action);
}

export const payerReducers: any = {
	table: payerTableReducers,
	payerInfo: payerInfoReducers,
};
