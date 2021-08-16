/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from '@ngrx/store';
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
