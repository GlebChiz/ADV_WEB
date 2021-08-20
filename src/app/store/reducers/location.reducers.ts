import { Action, createReducer, on } from '@ngrx/store';
import { ILocationState } from 'src/app/shared/interfaces/location.interface';
import { LocationActions } from '../actions/location.actions';

const initialLocationState: ILocationState = { selectedLocation: {} };

export function locationReducers(
	locationState: ILocationState | undefined,
	action: Action,
): ILocationState {
	return createReducer(
		initialLocationState,
		on(
			LocationActions.GetSelectedLocationSuccess,
			(state: ILocationState, { selectedLocation }: { selectedLocation: any }) => {
				return { ...state, selectedLocation };
			},
		),
		on(LocationActions.ClearSelectedLocation, (state: ILocationState) => {
			return { ...state, selectedLocation: undefined };
		}),
	)(locationState, action);
}
