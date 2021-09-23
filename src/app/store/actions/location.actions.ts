import { ILocation } from './../../shared/interfaces/location.interface';
import { createAction, props } from '@ngrx/store';

export const LocationActions = {
	GetSelectedLocationPending: createAction(
		'[Selected Location] Get selected location pending',
		props<{ id: string }>(),
	),
	GetSelectedLocationSuccess: createAction(
		'[Selected Location] Get selected location success',
		props<{ selectedLocation: ILocation }>(),
	),
	GetSelectedLocationError: createAction('[Selected Location] Get selected location error'),
	ClearSelectedLocation: createAction('[Selected Location] Clear selected location'),
};
