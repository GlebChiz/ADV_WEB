import { Action, createReducer, on } from '@ngrx/store';
import { ServiceActions } from './service.actions';
import { initialServiceState, IServiceState } from './service.state';

export function serviceReducers(
	serviceState: IServiceState | undefined,
	action: Action,
): IServiceState {
	return createReducer(
		initialServiceState,
		on(ServiceActions.SetService, (state, payload) => {
			const newState = { ...state };
			newState.services[payload.id.toJSON()] = payload.service;
			return newState;
		}),
	)(serviceState, action);
}
