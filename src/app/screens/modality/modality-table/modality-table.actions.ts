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

export const deleteModalityIemTablePending = createAction(
	'[Modality Table] delete table item pending',
	props<{ controller: string; filter: IFilter; id: string }>(),
);
export const deleteModalityIemTableError = createAction(
	'[Modality Table] delete table item error',
	props<{ error: string }>(),
);

export const dublicateModalityIemTablePending = createAction(
	'[Modality Table] dublicate table item pending',
	props<{ controller: string; filter: IFilter; id: string }>(),
);

export const createModalityIemTablePending = createAction(
	'[Modality Table] create table item pending',
	props<{ controller: string; item: any }>(),
);

export const editModalityIemTablePending = createAction(
	'[Modality Table] edit table item pending',
	props<{ controller: string; item: any }>(),
);
export const getCurrentItemPending = createAction(
	'[Modality Table] get current item',
	props<{ controller: string; id: string }>(),
);

export const clearModalityTable = createAction('[Modality Table] Clear');
