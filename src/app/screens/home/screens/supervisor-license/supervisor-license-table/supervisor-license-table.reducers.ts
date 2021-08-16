/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from '@ngrx/store';
import { tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { SupervisorLicenseTableActions } from './supervisor-license-table.actions';

const tableReducers: any = tableReducersFactory(
	SupervisorLicenseTableActions.UpdateSupervisorLicenseTableState,
	SupervisorLicenseTableActions.GetSupervisorLicenseTableDataPending,
	SupervisorLicenseTableActions.GetCurrentItemSuccess,
	SupervisorLicenseTableActions.GetSupervisorLicenseTableDataError,
	SupervisorLicenseTableActions.GetSupervisorLicenseTableDataSuccess,
	SupervisorLicenseTableActions.ClearCurrentSupervisorLicense,
);

export function supervisorLicenseTableReducers(state: any | undefined, action: Action): any {
	return tableReducers(state, action);
}
