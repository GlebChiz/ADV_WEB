/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from '@ngrx/store';
import { ITableState, tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { SessionPlanTableActions } from './session-plan-table.actions';

const tableReducers: any = tableReducersFactory(
	SessionPlanTableActions.UpdateSessionPlanTableState,
	SessionPlanTableActions.GetSessionPlanTableDataPending,
	SessionPlanTableActions.GetCurrentItemSuccess,
	SessionPlanTableActions.GetSessionPlanTableDataError,
	SessionPlanTableActions.GetSessionPlanTableDataSuccess,
	SessionPlanTableActions.ClearCurrentSessionPlan,
);

export function sessionPlanTableReducers(
	state: ITableState<any, any> | undefined,
	action: Action,
): any {
	return tableReducers(state, action);
}
