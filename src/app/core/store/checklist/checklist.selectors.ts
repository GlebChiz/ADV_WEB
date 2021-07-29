import { createSelector } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { IAppState } from '../state/app.state';
import { IChecklistState } from './checklist.state';

const checklistState = (state: IAppState) => state.checklistState;

export const selectChecklist = createSelector(
	checklistState,
	(state: IChecklistState, id: Guid) => {
		return state.checklists[id.toString()] || null;
	},
);
