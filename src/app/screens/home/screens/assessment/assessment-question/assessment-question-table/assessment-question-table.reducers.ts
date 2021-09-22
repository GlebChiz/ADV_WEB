/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IAssessmentQuestion } from 'src/app/shared/interfaces/assessment-question.interface';
import { ITableState, tableReducersFactory } from 'src/app/shared/table/table.reducer';
import { AssessmentQuestionTableActions } from './assessment-question-table.actions';
import { IAssessmentQuestionTranslate } from './assessment-question-translate-popup/assessment-question-translate-popup.component';

const tableReducers: ActionReducer<ITableState<any, any, any>> = tableReducersFactory(
	AssessmentQuestionTableActions.UpdateAssessmentQuestionTableState,
	AssessmentQuestionTableActions.GetAssessmentQuestionTableDataPending,
	AssessmentQuestionTableActions.GetCurrentItemSuccess,
	AssessmentQuestionTableActions.GetAssessmentQuestionTableDataError,
	AssessmentQuestionTableActions.GetAssessmentQuestionTableDataSuccess,
	AssessmentQuestionTableActions.ClearCurrentAssessmentQuestion,
);

export function assessmentQuestionTableReducers(
	state: ITableState<IAssessmentQuestion, IAssessmentQuestion, any>,
	action: Action,
): ITableState<IAssessmentQuestion, IAssessmentQuestion, any> {
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

// export const appReducers: ActionReducerMap<IStore> = {
// 	tableReducers: tableReducers,
// };

export const assessmentQuestionReducers: ITableState<
	IAssessmentQuestion,
	IAssessmentQuestion,
	any
> = {
	table: assessmentQuestionTableReducers as any,
	additional: assessmentQuestionTranslateReducers,
};
