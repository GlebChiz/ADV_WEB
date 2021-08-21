import { Action, createReducer, on } from '@ngrx/store';
import {
	IClinicanDetailsState,
	initialClinicanDetailsState,
} from '../state/clinician-details.state';
import { ClinicanDetailsActions } from '../actions/clinician-details.actions';

export function clinicianDetailsReducers(
	patientDetailsState: IClinicanDetailsState | undefined,
	action: Action,
): IClinicanDetailsState {
	return createReducer(
		initialClinicanDetailsState,
		on(ClinicanDetailsActions.GetClinicanDetailsPending, (state: any) => ({
			...state,
			isLoading: true,
		})),
		on(
			ClinicanDetailsActions.GetClinicanDetailsSuccess,
			(state: any, { current }: { current: any }) => ({
				...state,
				current,
				isLoading: false,
			}),
		),
		on(ClinicanDetailsActions.GetClinicanDetailsError, (state: any) => ({
			...state,
			isLoading: false,
		})),
	)(patientDetailsState, action);
}
