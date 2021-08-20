import { Action, createReducer, on } from '@ngrx/store';
import {
	IAssessmentQuestionDetailsState,
	initialAssessmentQuestionDetailsState,
} from '../state/assessment-question-details.state';
import { AssessmentQuestionDetailsActions } from '../actions/assessment-question-details.actions';

export function assessmentQuestionDetailsReducers(
	sessionPlanDetailsState: IAssessmentQuestionDetailsState | undefined,
	action: Action,
): IAssessmentQuestionDetailsState {
	return createReducer(
		initialAssessmentQuestionDetailsState,
		on(AssessmentQuestionDetailsActions.GetAssessmentQuestiondetailsPending, (state: any) => ({
			...state,
			isLoading: true,
		})),
		on(
			AssessmentQuestionDetailsActions.GetAssessmentQuestiondetailsSuccess,
			(state: any, { current }: { current: any }) => ({
				...state,
				current,
				isLoading: false,
			}),
		),
		on(AssessmentQuestionDetailsActions.GetAssessmentQuestiondetailsError, (state: any) => ({
			...state,
			isLoading: false,
		})),
	)(sessionPlanDetailsState, action);
}
