import { Action, createReducer, on } from '@ngrx/store';
import { AssessmentQuestionActions } from '../actions/assessment-question.actions';
import {
	initialAssessmentQuestionState,
	IAssessmentQuestionState,
} from '../state/assessment-question.state';

export function assessmentQuestionReducers(
	assessmentQuestionState: IAssessmentQuestionState | undefined,
	action: Action,
): IAssessmentQuestionState {
	return createReducer(
		initialAssessmentQuestionState,
		on(AssessmentQuestionActions.GetAssessmentQuestionPending, (state: any) => ({
			...state,
			isLoading: true,
		})),
		on(
			AssessmentQuestionActions.GetAssessmentQuestionSuccess,
			(state: any, { current }: { current: any }) => ({
				...state,
				current,
				isLoading: false,
			}),
		),
		on(AssessmentQuestionActions.GetAssessmentQuestionError, (state: any) => ({
			...state,
			isLoading: false,
		})),
	)(assessmentQuestionState, action);
}
