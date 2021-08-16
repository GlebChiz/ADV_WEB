import { Action, createReducer, on } from '@ngrx/store';
import { PublicSnipitDetailsActions } from '../actions/public-snipit-details.actions';
import {
	initialPublicSnipitDetailsState,
	IPublicSnipitDetailsState,
} from '../state/public-snipit-details.state';

export function publicSnipitDetailsReducers(
	publicSnipitDetailsState: IPublicSnipitDetailsState | undefined,
	action: Action,
): IPublicSnipitDetailsState {
	return createReducer(
		initialPublicSnipitDetailsState,
		on(PublicSnipitDetailsActions.GetPublicSnipitDetailsPending, (state: any) => ({
			...state,
			isLoading: true,
		})),
		on(
			PublicSnipitDetailsActions.GetPublicSnipitDetailsSuccess,
			(state: any, { current }: { current: any }) => ({
				...state,
				current,
				isLoading: false,
			}),
		),
		on(PublicSnipitDetailsActions.GetPublicSnipitDetailsError, (state: any) => ({
			...state,
			isLoading: false,
		})),
	)(publicSnipitDetailsState, action);
}
