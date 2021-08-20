/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from '@ngrx/store';
import { tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { AssessmentQuestionTableActions } from './assessment-question-table.actions';

const tableReducers: any = tableReducersFactory(
	AssessmentQuestionTableActions.UpdateAssessmentQuestionTableState,
	AssessmentQuestionTableActions.GetAssessmentQuestionTableDataPending,
	AssessmentQuestionTableActions.GetCurrentItemSuccess,
	AssessmentQuestionTableActions.GetAssessmentQuestionTableDataError,
	AssessmentQuestionTableActions.GetAssessmentQuestionTableDataSuccess,
	AssessmentQuestionTableActions.ClearCurrentAssessmentQuestion,
);

export function assessmentQuestionTableReducers(state: any | undefined, action: Action): any {
	return tableReducers(state, action);
}
