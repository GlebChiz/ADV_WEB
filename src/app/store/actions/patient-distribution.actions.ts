import { createAction, props } from '@ngrx/store';

export const PatientDistributionActions = {
	UpdateFiledPatientDistributionPending: createAction(
		'[Patient Distribution] Update filed patient distribution pending',
		props<{ patientIds: string[]; supervisorId: string; startDate: Date }>(),
	),
	UpdateFiledPatientDistributionError: createAction(
		'[Patient Distribution] Update filed patient distribution error',
	),
	UpdateFiledPatientDistributionSuccess: createAction(
		'[Patient Distribution] Update filed patient distribution success',
	),
};
