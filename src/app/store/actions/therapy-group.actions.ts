import { createAction, props } from '@ngrx/store';

export const TherapyGroupActions = {
	UpdateFiledTherapyGroupPending: createAction(
		'[Therapy Group] Update filed therapy group pending',
		props<{ ids: string[]; value: any; entity: string }>(),
	),
	UpdateFiledTherapyGroupError: createAction('[Therapy Group] Update filed therapy group error'),
	UpdateFiledTherapyGroupSuccess: createAction(
		'[Therapy Group] Update filed therapy group success',
	),
};
