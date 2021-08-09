import { createAction, props } from '@ngrx/store';

export const getPatientTableDataPending = createAction(
	'[Patient Table] get table data pending',
	props<{ controller: string }>(),
);
export const updatePatientTableState = createAction(
	'[Patient Table] Update',
	props<{ data: any }>(),
);
export const deletePatientItemTablePending = createAction(
	'[Patient Table] delete item table pending',
	props<{ controller: string }>(),
);
export const clearPatientTable = createAction('[Patient Table] Clear');
