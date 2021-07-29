import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { ICRMSearchState } from './crmsearch.state';

const crmSearchState = (state: IAppState) => state.crmSearchState;

export const selectCRMSearch = createSelector(
	crmSearchState,
	(state: ICRMSearchState) => state?.search,
);
