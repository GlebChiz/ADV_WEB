/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer } from '@ngrx/store';
import { tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { AssessmentTableActions } from './assessment-table.actions';

const tableReducers: any = tableReducersFactory(
	AssessmentTableActions.UpdateAssessmentTableState,
	AssessmentTableActions.GetAssessmentTableDataPending,
	AssessmentTableActions.GetCurrentItemSuccess,
	AssessmentTableActions.GetAssessmentTableDataError,
	AssessmentTableActions.GetAssessmentTableDataSuccess,
	AssessmentTableActions.ClearCurrentAssessment,
);

export function assessmentTableReducers(state: any | undefined, action: Action): any {
	return tableReducers(state, action);
}

export function assessmentTableInfoReducers(assessmentState: any, action: Action): any {
	return createReducer({})(assessmentState, action);
}

export const assessmentReducers: any = {
	table: assessmentTableReducers,
	assessmentTableInfo: assessmentTableInfoReducers,
};
