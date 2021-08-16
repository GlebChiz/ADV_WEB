import { Action, createReducer, on } from '@ngrx/store';
import { SessionPlanDetailsActions } from '../actions/session-plan-details.actions';
import {
	initialSessionPlanDetailsState,
	ISessionPlanDetailsState,
} from '../state/session-plan-details.state';

export function sessionPlanDetailsReducers(
	sessionPlanDetailsState: ISessionPlanDetailsState | undefined,
	action: Action,
): ISessionPlanDetailsState {
	return createReducer(
		initialSessionPlanDetailsState,
		on(SessionPlanDetailsActions.GetSessionPlanDetailsPending, (state: any) => ({
			...state,
			isLoading: true,
		})),
		on(
			SessionPlanDetailsActions.GetSessionPlanDetailsSuccess,
			(state: any, { current }: { current: any }) => ({
				...state,
				current,
				isLoading: false,
			}),
		),
		on(SessionPlanDetailsActions.GetSessionPlanDetailsError, (state: any) => ({
			...state,
			isLoading: false,
		})),
	)(sessionPlanDetailsState, action);
}
