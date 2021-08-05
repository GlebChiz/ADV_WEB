import { createAction, props } from '@ngrx/store';

export const getPatientTableDataPending = createAction(
	'[Patient Table] get table data pending',
	props<{ controller: string }>(),
);
export const updatePatientTableState = createAction('[Patient Table] Update');
export const clearPatientTable = createAction('[Patient Table] Clear');
