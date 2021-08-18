/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from '@ngrx/store';
import { tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { UnsupervisedServicesTableActions } from './unsupervised-services-table.actions';

const tableReducers: any = tableReducersFactory(
	UnsupervisedServicesTableActions.UpdateUnsupervisedServicesTableState,
	UnsupervisedServicesTableActions.GetUnsupervisedServicesTableDataPending,
	UnsupervisedServicesTableActions.GetCurrentItemSuccess,
	UnsupervisedServicesTableActions.GetUnsupervisedServicesTableDataError,
	UnsupervisedServicesTableActions.GetUnsupervisedServicesTableDataSuccess,
	UnsupervisedServicesTableActions.ClearCurrentUnsupervisedServices,
);

export function unsupervisedServicesTableReducers(state: any | undefined, action: Action): any {
	return tableReducers(state, action);
}
