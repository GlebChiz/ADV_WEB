import { createSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { ICall } from '../../models/call.model';
import { IAppState } from '../state/app.state';
import { ICallState } from './call.state';

const callState = (state: IAppState) => state.callState;

export const selectActiveCall = createSelector(callState, (state: ICallState) => {
	return state.activeCall;
});

export const selectCall: MemoizedSelector<
	IAppState,
	ICall | null,
	DefaultProjectorFn<ICall | null>
> = createSelector(callState, (state: ICallState) => {
	return state.call;
});
