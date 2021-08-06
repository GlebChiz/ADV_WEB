import { createAction, props } from '@ngrx/store';
import { IFilter } from 'src/app/shared/table/table.model';

export const getModalityTableDataPending = createAction(
	'[Modality Table] get table data pending',
	props<{ controller: string; filter: IFilter }>(),
);
export const updateModalityTableState = createAction(
	'[Modality Table] Update',
	props<{ data: any }>(),
);
export const clearModalityTable = createAction('[Modality Table] Clear');
