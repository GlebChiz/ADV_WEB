/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store';
import { TherapyGroupDetailsActions } from '../actions/therapy-group-details.actions';
import {
	initialTherapyGroupDetailsState,
	ITherapyGroupDetailsState,
} from '../state/therapy-group-details.state';

export function therapyGroupDetailsReducers(
	therapyGroupDetailsState: ITherapyGroupDetailsState | undefined,
	action: Action,
): ITherapyGroupDetailsState {
	return createReducer(
		initialTherapyGroupDetailsState,
		on(TherapyGroupDetailsActions.GetTherapyGroupDetailsPending, (state: any) => ({
			...state,
			isLoading: true,
		})),
		on(
			TherapyGroupDetailsActions.GetTherapyGroupDetailsSuccess,
			(state: any, { current }: { current: any }) => ({
				...state,
				current,
				isLoading: false,
			}),
		),
		on(TherapyGroupDetailsActions.GetTherapyGroupDetailsError, (state: any) => ({
			...state,
			isLoading: false,
		})),
	)(therapyGroupDetailsState, action);
}
