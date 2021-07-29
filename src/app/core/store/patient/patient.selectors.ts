import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IPatientState } from './patient.state';

const patientState = (state: IAppState) => state.patientState;

export const selectPatients = createSelector(
	patientState,
	(state: IPatientState) => state?.patients,
);

export const selectPatientModel = createSelector(
	patientState,
	(state: IPatientState) => state?.patient,
);

export const selectPatientPrivatePersonLinks = createSelector(
	patientState,
	(state: IPatientState, data) => {
		return state.privatePersonLinks[data.patientId] || null;
	},
);
