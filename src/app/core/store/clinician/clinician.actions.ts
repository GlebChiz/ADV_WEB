import { createAction, props } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { Clinician } from 'src/app/core/models/clinician.model';

export const ClinicianActions = {
	NewClinicianModel: createAction('[Clinician] New Clinician Model'),
	GetClinicianModel: createAction('[Clinician] Get Clinician Model', props<{ id: Guid | null }>()),
	GetClinicianModelSuccess: createAction(
		'[Clinician] Get Clinician Model Success',
		props<{ clinician: Clinician }>(),
	),
	GetClinicianModelFail: createAction('[Clinician] Get Clinician Model Fail'),
	UpdateClinician: createAction('[Clinician] Update Clinician', props<Clinician>()),
	UpdateClinicianComplete: createAction('[Clinician] Update Clinician Compete'),
	UpdateClinicianFail: createAction('[Clinician] Update Clinician Fail', props<{ errors: any }>()),
	CreateClinician: createAction('[Clinician] Create Clinician', props<{ clinician: Clinician }>()),
	CreateClinicianComplete: createAction(
		'[Clinician] Create Clinician Compete',
		props<{ id: string }>(),
	),
};
