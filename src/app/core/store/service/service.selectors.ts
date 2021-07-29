import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IServiceState } from './service.state';

const serviceState = (state: IAppState) => state.serviceState;

export const selectService = createSelector(serviceState, (state: IServiceState, id: number) => {
	return state.services[id] || null;
});
