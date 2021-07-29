import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IFilterState } from './filter.state';

const filterState = (state: IAppState) => state.filterState;

export const selectFilterData = createSelector(filterState, (state: IFilterState, id: string) => {
	return state.filters[id] ? { ...state.filters[id] } : null;
});

export const selectFilterStatus = createSelector(filterState, (state: IFilterState, id: string) => {
	return state.openFilters[id] === true;
});
