import { Action, createReducer, on } from '@ngrx/store';
import { IDropDownState, IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { DropdownActions } from '../actions/dropdowns.actions';

const initialDropdownState: IDropDownState = { data: [], isLoading: false };

export function roomDropdownReducers(
	dropdownState: IDropDownState | undefined,
	action: Action,
): IDropDownState {
	return createReducer(
		initialDropdownState,
		on(
			DropdownActions.GetRoomSizeSuccess,
			(state: IDropDownState, { data }: { data: IDropdownData[] }) => {
				return { ...state, roomSize: data, isLoading: false };
			},
		),
		on(
			DropdownActions.GetRoomSetupSuccess,
			(state: IDropDownState, { data }: { data: IDropdownData[] }) => {
				return { ...state, roomSetup: data, isLoading: false };
			},
		),
	)(dropdownState, action);
}
