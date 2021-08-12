import { createAction, props } from '@ngrx/store';

export const PatientDetailsActions = {
	GetPatientDetailsPending: createAction(
		'[Patient details] Get details pending',
		props<{ id: string }>(),
	),
	GetPatientDetailsSuccess: createAction(
		'[Patient details] Get details success',
		props<{ current: string }>(),
	),
	GetPatientDetailsError: createAction('[Patient details] Get details error'),
};
