import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IClinicianState } from './clinician.state';

const clinicianState = (state: IAppState) => state.clinicianState;

export const selectClinicianModel = createSelector(
	clinicianState,
	(state: IClinicianState) => state?.clinician,
);
