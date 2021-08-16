import { createAction, props } from '@ngrx/store';

export const SessionPlanDetailsActions = {
	GetSessionPlanDetailsPending: createAction(
		'[Session Plan details] Get details pending',
		props<{ id: string }>(),
	),
	GetSessionPlanDetailsSuccess: createAction(
		'[Session Plan details] Get details success',
		props<{ current: string }>(),
	),
	GetSessionPlanDetailsError: createAction('[Session Plan details] Get details error'),
};
