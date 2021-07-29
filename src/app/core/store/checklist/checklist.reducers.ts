import { Action, createReducer, on } from '@ngrx/store';
import { ChecklistActions } from './checklist.actions';
import { IChecklistState, initialChecklistState } from './checklist.state';

export function checklistReducers(
	checklistState: IChecklistState | undefined,
	action: Action,
): IChecklistState {
	return createReducer(
		initialChecklistState,
		on(ChecklistActions.SetChecklist, (state, payload) => {
			const newState = { ...state };
			newState.checklists[payload.checklist.id.toString()] = payload.checklist;
			return newState;
		}),
	)(checklistState, action);
}
