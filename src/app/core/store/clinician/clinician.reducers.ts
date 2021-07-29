import { Action, createReducer, on } from '@ngrx/store';
import { ClinicianActions } from './clinician.actions';
import { IClinicianState, initialClinicianState } from './clinician.state';

export function clinicianReducers(
	clinicianState: IClinicianState | undefined,
	action: Action,
): IClinicianState {
	return createReducer(
		initialClinicianState,
		on(ClinicianActions.NewClinicianModel, (state) => ({ ...state, clinician: null })),
		on(ClinicianActions.GetClinicianModel, (state) => ({ ...state, clinician: null })),
		on(ClinicianActions.GetClinicianModelSuccess, (state, payload) => ({
			...state,
			clinician: payload.clinician,
		})),
	)(clinicianState, action);
}
