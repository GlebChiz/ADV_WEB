import { createAction, props } from '@ngrx/store';

export const getModalityTableDataPending = createAction(
	'[Modality Table] get table data pending',
	props<{ controller: string }>(),
);
export const updateModalityTableState = createAction('[Modality Table] Update');
export const clearModalityTable = createAction('[Modality Table] Clear');
