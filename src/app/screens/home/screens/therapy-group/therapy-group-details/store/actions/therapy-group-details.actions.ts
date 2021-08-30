import { createAction, props } from '@ngrx/store';

export const TherapyGroupDetailsActions = {
	GetTherapyGroupDetailsPending: createAction(
		'[TherapyGroup details] Get details pending',
		props<{ id: string }>(),
	),
	GetTherapyGroupDetailsSuccess: createAction(
		'[TherapyGroup details] Get details success',
		props<{ current: any }>(),
	),
	GetTherapyGroupDetailsError: createAction('[TherapyGroup details] Get details error'),
};
