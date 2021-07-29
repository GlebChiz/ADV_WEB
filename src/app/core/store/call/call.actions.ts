import { createAction, props } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { Call, CallPatientIndex } from '../../models/call.model';

export const CallActions = {
	SetCall: createAction('[Call] Set call', props<{ call: Call | null }>()),
	GetCall: createAction('[Call] Get call', props<{ callId: Guid }>()),
	CreateCall: createAction('[Call] Create call', props<{ call: Call }>()),
	AddRequestedPatient: createAction('[Call] add requested patient', props<{ callId: Guid }>()),
	DeleteRequestedPatient: createAction(
		'[Call] Delete requested patient',
		props<{ callId: Guid }>(),
	),
	SaveCallPatient: createAction('[Call] Save call patient', props<{ model: CallPatientIndex }>()),
	RefreshCall: createAction('[Call] Refresh call', props<{ id: Guid }>()),
	UpdateCall: createAction('[Call] Update call', props<{ call: Call }>()),
	UpdateCallComplete: createAction('[Call] Update call Complete'),
	UpdateCallFail: createAction('[Call] Update call Fail', props<{ errors: any }>()),
	EndCall: createAction('[Call] End call', props<{ callId: Guid }>()),

	SetActiveCall: createAction('[Call] Set Active Call', props<{ call: Call }>()),
	GetActiveCall: createAction('[Call] Get Active Call'),
};
