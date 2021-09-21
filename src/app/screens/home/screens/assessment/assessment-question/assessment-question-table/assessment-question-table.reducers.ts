/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store';
import { IAssessmentQuestion } from 'src/app/shared/interfaces/assessment-question.interface';
import { ITable, ITableState, tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { AssessmentQuestionTableActions } from './assessment-question-table.actions';
import { IAssessmentQuestionTranslate } from './assessment-question-translate-popup/assessment-question-translate-popup.component';

const tableReducers: any = tableReducersFactory(
	AssessmentQuestionTableActions.UpdateAssessmentQuestionTableState,
	AssessmentQuestionTableActions.GetAssessmentQuestionTableDataPending,
	AssessmentQuestionTableActions.GetCurrentItemSuccess,
	AssessmentQuestionTableActions.GetAssessmentQuestionTableDataError,
	AssessmentQuestionTableActions.GetAssessmentQuestionTableDataSuccess,
	AssessmentQuestionTableActions.ClearCurrentAssessmentQuestion,
);

export function assessmentQuestionTableReducers(
	state: ITable<IAssessmentQuestion, IAssessmentQuestion>,
	action: Action,
): ITable<IAssessmentQuestion, IAssessmentQuestion> {
	return tableReducers(state, action);
}

export function assessmentQuestionTranslateReducers(
	patientInfoState: any | undefined,
	action: Action,
): any {
	return createReducer(
		{},
		on(
			AssessmentQuestionTableActions.GetCurrentTranslationAssessmentQuestionSuccess,
			(
				state: any,
				{ currentTranslation }: { currentTranslation: IAssessmentQuestionTranslate },
			) => ({
				...state,
				...currentTranslation,
			}),
		),
	)(patientInfoState, action);
}

export const assessmentQuestionReducers: ITableState<
	IAssessmentQuestion,
	IAssessmentQuestion,
	any
> = {
	table: assessmentQuestionTableReducers as any,
	additional: assessmentQuestionTranslateReducers,
};
