import { createAction, props } from '@ngrx/store';

export const ClinicanDetailsActions = {
	GetClinicanDetailsPending: createAction(
		'[Clinican details] Get details pending',
		props<{ id: string }>(),
	),
	GetClinicanDetailsSuccess: createAction(
		'[Clinican details] Get details success',
		props<{ current: string }>(),
	),
	GetClinicanDetailsError: createAction('[Clinican details] Get details error'),
};
