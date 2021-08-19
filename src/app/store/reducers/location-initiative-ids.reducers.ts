import { Action, createReducer, on } from '@ngrx/store';
import { IDropDownState, IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { DropdownActions } from '../actions/dropdowns.actions';

const initialDropdownState: IDropDownState = { data: [], isLoading: false };

export function locationDropdownReducers(
	dropdownState: IDropDownState | undefined,
	action: Action,
): IDropDownState {
	return createReducer(
		initialDropdownState,
		on(
			DropdownActions.GetLocationInitiativeIdsSuccess,
			(state: IDropDownState, { data }: { data: IDropdownData[] }) => {
				return { ...state, data, isLoading: false };
			},
		),
	)(dropdownState, action);
}
