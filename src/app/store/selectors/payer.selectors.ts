import { createSelector } from '@ngrx/store';
import { IStore } from '..';

const checklistState = (state: IStore) => state.payerState;

export const selectTypePayer = createSelector(checklistState, (state: any, id: string) => {
	return state.payerState[id] || null;
});
