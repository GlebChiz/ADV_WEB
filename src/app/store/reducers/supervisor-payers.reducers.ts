import { Action, createReducer, on } from '@ngrx/store';
import { IDropdownData, IDropDownState } from 'src/app/shared/interfaces/dropdown.interface';
import { DropdownActions } from '../actions/dropdowns.actions';

const initialDropdownState: IDropDownState = { data: [], isLoading: false };

export function supervisorLicensePayersDropdownReducers(
	supervisorState: IDropDownState | undefined,
	action: Action,
): IDropDownState {
	return createReducer(
		initialDropdownState,
		// eslint-disable-next-line @typescript-eslint/typedef
		on(
			DropdownActions.GetSupervisorLicensePayersSuccess,
			(state: IDropDownState, { data }: { data: IDropdownData[] }) => {
				return { ...state, data };
			},
		),
	)(supervisorState, action);
}
