import { createAction, props } from '@ngrx/store';

export const PublicSnipitDetailsActions = {
	GetPublicSnipitDetailsPending: createAction(
		'[Public Snipit details] Get details pending',
		props<{ id: string }>(),
	),
	GetPublicSnipitDetailsSuccess: createAction(
		'[Public Snipit details] Get details success',
		props<{ current: string }>(),
	),
	GetPublicSnipitDetailsError: createAction('[Public Snipit details] Get details error'),
};
