import { createAction, props } from '@ngrx/store';
import { ISupervisorType } from 'src/app/shared/interfaces/supervisors.interface';

// eslint-disable-next-line @typescript-eslint/typedef
export const SupervisorActions = {
	GetSupervisorPending: createAction('[Supervisor] Get types pending'),
	GetSupervisorError: createAction('[Supervisor] Get types error'),
	GetSupervisorSuccess: createAction(
		'[Supervisor] Get types success',
		props<{ data: ISupervisorType[] }>(),
	),
};
