import { Action, createReducer, on } from '@ngrx/store';
import { CallActions } from './call.actions';
import { ICallState, initialCallState } from './call.state';

export function callReducers(callState: ICallState | undefined, action: Action): ICallState {
	return createReducer(
		initialCallState,
		on(CallActions.SetCall, (state, payload) => {
			return { ...state, call: payload.call };
		}),
		on(CallActions.SetActiveCall, (state, payload) => {
			return { ...state, activeCall: payload.call };
		}),
	)(callState, action);
}
