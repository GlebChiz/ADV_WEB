import { createAction, props } from '@ngrx/store';
import { Patient } from 'src/app/core/models/patient.model';
import { PrivatePersonLink } from '../../models/person.model';

export const PatientActions = {
	ResetPatients: createAction('[Patient] Reset patients'),
	UpdatePatient: createAction('[Patient] Update Patient', props<Patient>()),
	UpdatePatientComplete: createAction('[Patient] Update Patient Compete'),
	UpdatePatientFail: createAction('[Patient] Update Patient Fail', props<{ errors: any }>()),
	GetGridColumns: createAction('[Patient] Get Grid Columns'),
	GetGridColumnsSuccess: createAction(
		'[Patient] Get Grid Columns Success',
		props<{ columns: string[] }>(),
	),
	GetGridColumnsFail: createAction('[Patient] Get Grid Columns Fail'),
	GetPrivatePersonLinks: createAction(
		'[Patient] Get private persons links',
		props<{ patientId: string }>(),
	),
	// tslint:disable-next-line:max-line-length
	GetPrivatePersonLinksSuccess: createAction(
		'[Patient] Get private persons links success',
		props<{ patientId: string; data: PrivatePersonLink[] }>(),
	),
};
