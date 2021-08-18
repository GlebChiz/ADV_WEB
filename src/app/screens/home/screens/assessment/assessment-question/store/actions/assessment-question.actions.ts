import { createAction, props } from '@ngrx/store';

export const AssessmentQuestionActions = {
	GetAssessmentQuestionPending: createAction(
		'[Assessment Question] Get details pending',
		props<{ id: string }>(),
	),
	GetAssessmentQuestionSuccess: createAction(
		'[Assessment Question] Get details success',
		props<{ current: string }>(),
	),
	GetAssessmentQuestionError: createAction('[Assessment Question] Get details error'),
};
