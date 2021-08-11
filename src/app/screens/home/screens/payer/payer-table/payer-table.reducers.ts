/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from '@ngrx/store';
import { tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { PayerTableActions } from './payer-table.actions';

const tableReducers: any = tableReducersFactory(
	PayerTableActions.UpdatePayerTableState,
	PayerTableActions.GetPayerTableDataPending,
	PayerTableActions.GetCurrentItemSuccess,
	PayerTableActions.GetPayerTableDataError,
	PayerTableActions.GetPayerTableDataSuccess,
);

export function PayerTableReducers(state: any | undefined, action: Action): any {
	return tableReducers(state, action);
}
