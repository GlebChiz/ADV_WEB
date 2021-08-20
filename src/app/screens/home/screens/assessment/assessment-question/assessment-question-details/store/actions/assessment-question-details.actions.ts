import { createAction, props } from '@ngrx/store';

export const AssessmentQuestionDetailsActions = {
	GetAssessmentQuestiondetailsPending: createAction(
		'[AssessmentQuestion details] Get details pending',
		props<{ id: string }>(),
	),
	GetAssessmentQuestiondetailsSuccess: createAction(
		'[AssessmentQuestion details] Get details success',
		props<{ current: any }>(),
	),
	GetAssessmentQuestiondetailsError: createAction('[AssessmentQuestion] Get details error'),
};
