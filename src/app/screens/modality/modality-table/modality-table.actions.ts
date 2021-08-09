import { createAction, props } from '@ngrx/store';
import { IFilter } from 'src/app/shared/table/table.model';

export const getModalityTableDataPending = createAction(
	'[Modality Table] get table data pending',
	props<{ controller: string; filter: IFilter }>(),
);

export const deleteModalityIemTablePending = createAction(
	'[Modality Table] delete table item pending',
	props<{ controller: string; filter: IFilter; id: string }>(),
);

export const updateModalityTableState = createAction(
	'[Modality Table] Update',
	props<{ data: any }>(),
);

export const dublicateModalityIemTablePending = createAction(
	'[Modality Table] dublicate table item pending',
	props<{ controller: string; filter: IFilter; id: string }>(),
);

export const createModalityIemTablePending = createAction(
	'[Modality Table] create table item pending',
	props<{ controller: string; filter: IFilter; model: any }>(),
);

export const editModalityIemTablePending = createAction(
	'[Modality Table] edit table item pending',
	props<{ controller: string; filter: IFilter; id: string }>(),
);

export const clearModalityTable = createAction('[Modality Table] Clear');
