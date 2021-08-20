import { Action, createReducer, on } from '@ngrx/store';
import { DropdownActions } from '../actions/dropdowns.actions';
import {
	initialSupervisorPayerState,
	ISupervisorPayerState,
} from '../states/supervisor-payer.state';

export function supervisorPayerReducers(
	supervisorState: ISupervisorPayerState | undefined,
	action: Action,
): ISupervisorPayerState {
	return createReducer(
		initialSupervisorPayerState,
		// eslint-disable-next-line @typescript-eslint/typedef
		on(DropdownActions.GetSupervisorLicenseSuccess, (state, data) => {
			return { ...state, data };
		}),
	)(supervisorState, action);
}
