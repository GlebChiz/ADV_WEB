import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { ICallState } from './call.state';

const callState = (state: IAppState) => state.callState;

export const selectActiveCall = createSelector(callState, (state: ICallState) => {
	return state.activeCall;
});

export const selectCall = createSelector(callState, (state: ICallState) => {
	return state.call;
});
