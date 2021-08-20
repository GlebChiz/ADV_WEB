import { createAction, props } from '@ngrx/store';
import { ISupervisorPayerType } from 'src/app/shared/interfaces/supervisor-payer.interface';

// eslint-disable-next-line @typescript-eslint/typedef
export const SupervisorPayerActions = {
	GetSupervisorPayerPending: createAction('[Supervisor Payer] Get types pending'),
	GetSupervisorPayerError: createAction('[Supervisor Payer] Get types error'),
	GetSupervisorPayerSuccess: createAction(
		'[Supervisor Payer] Get types success',
		props<{ data: ISupervisorPayerType[] }>(),
	),
};
