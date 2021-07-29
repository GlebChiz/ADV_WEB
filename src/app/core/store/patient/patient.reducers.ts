import { Action, createReducer, on } from '@ngrx/store';
import { PatientActions } from './patient.actions';
import { IPatientState, initialPatientState } from './patient.state';

export function patientReducers(
	patientState: IPatientState | undefined,
	action: Action,
): IPatientState {
	return createReducer(
		initialPatientState,
		on(PatientActions.ResetPatients, (state) => ({ ...state, patients: null })),
		on(PatientActions.GetPrivatePersonLinksSuccess, (state, payload) => {
			const newState = { ...state };
			newState.privatePersonLinks[payload.patientId] = payload.data;
			return newState;
		}),
	)(patientState, action);
}
