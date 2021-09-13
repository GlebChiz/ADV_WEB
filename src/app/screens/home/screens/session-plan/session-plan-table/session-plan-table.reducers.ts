/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store';
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

export function sessionPlanInfoReducers(sessionPlanState: any, action: Action): any {
	return createReducer(
		{},
		on(
			SessionPlanTableActions.GetCurrentTranslationSessionPlanSuccess,
			(state: any, { currentTranslation }: { currentTranslation: any }) => ({
				...state,
				...currentTranslation,
			}),
		),
	)(sessionPlanState, action);
}

export const sessionPlanReducers: any = {
	table: sessionPlanTableReducers,
	sessionPlanInfo: sessionPlanInfoReducers,
};
