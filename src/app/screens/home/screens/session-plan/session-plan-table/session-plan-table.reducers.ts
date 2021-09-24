/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store';
import { ITable, tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { SessionPlanTableActions } from './session-plan-table.actions';

const tableReducers: any = tableReducersFactory(
	SessionPlanTableActions.UpdateSessionPlanTableState,
	SessionPlanTableActions.GetSessionPlanTableDataPending,
	SessionPlanTableActions.GetCurrentItemSuccess,
	SessionPlanTableActions.GetSessionPlanTableDataError,
	SessionPlanTableActions.GetSessionPlanTableDataSuccess,
	SessionPlanTableActions.ClearCurrentSessionPlan,
);

export function sessionPlanTableReducers(state: ITable<any, any> | undefined, action: Action): any {
	return tableReducers(state, action);
}

export function sessionPlanInfoReducers(sessionPlanState: any, action: Action): any {
	return createReducer(
		undefined,
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
