import { Action, createReducer, on } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { FilterActions } from './filter.actions';
import { IFilterState, initialFilterState } from './filter.state';

export function filterReducers(
	filterState: IFilterState | undefined,
	action: Action,
): IFilterState {
	return createReducer(
		initialFilterState,
		on(FilterActions.SetFilter, (state, payload) => {
			const newState = { ...state };
			newState.filters[payload.id] = payload.filter;
			return { ...newState };
		}),
		on(FilterActions.OpenFilter, (state, payload) => {
			const newState = { ...state };
			newState.openFilters[payload.id] = true;
			return { ...newState };
		}),
		on(FilterActions.CloseFilter, (state, payload) => {
			const newState = { ...state };
			newState.openFilters[payload.id] = false;
			return { ...newState };
		}),
		on(FilterActions.TriggerFilter, (state, payload) => {
			const newState = { ...state };
			const filter = newState.filters[payload.id] || {};
			filter.rnd = Guid.create().toString();
			newState.filters[payload.id] = { ...filter };
			return { ...newState };
		}),
	)(filterState, action);
}
