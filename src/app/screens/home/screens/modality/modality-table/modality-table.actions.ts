import { createAction, props } from '@ngrx/store';
import { IFilter } from 'src/app/shared/table/table.model';

export const ModalityTableActions = {
	GetModalityTableDataPending: createAction(
		'[Modality Table] get table data pending',
		props<{ controller: string; filter: IFilter }>(),
	),
	GetModalityTableDataSuccess: createAction(
		'[Modality Table] get table data success',
		props<{ controller: string; filter: IFilter }>(),
	),
	GetModalityTableDataError: createAction(
		'[Modality Table] get table data error',
		props<{ controller: string; filter: IFilter }>(),
	),
	UpdateModalityTableState: createAction('[Modality Table] Update', props<{ data: any }>()),

	DeleteModalityIemTablePending: createAction(
		'[Modality Table] delete table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DeleteModalityIemTableError: createAction(
		'[Modality Table] delete table item error',
		props<{ error: string }>(),
	),
	DeleteModalityIemTableSuccess: createAction(
		'[Modality Table] delete table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	DublicateModalityIemTablePending: createAction(
		'[Modality Table] dublicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateModalityIemTableError: createAction(
		'[Modality Table] dublicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateModalityIemTableSuccess: createAction(
		'[Modality Table] dublicate table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	CreateModalityIemTablePending: createAction(
		'[Modality Table] create table item pending',
		props<{ controller: string; item: any }>(),
	),
	CreateModalityIemTableError: createAction(
		'[Modality Table] create table item error',
		props<{ controller: string; item: any }>(),
	),
	CreateModalityIemTableSuccess: createAction(
		'[Modality Table] create table item success',
		props<{ controller: string; item: any }>(),
	),

	EditModalityIemTablePending: createAction(
		'[Modality Table] edit table item pending',
		props<{ controller: string; item: any }>(),
	),
	EditModalityIemTableError: createAction(
		'[Modality Table] edit table item error',
		props<{ controller: string; item: any }>(),
	),
	EditModalityIemTableSuccess: createAction(
		'[Modality Table] edit table item success',
		props<{ controller: string; item: any }>(),
	),

	GetCurrentItemPending: createAction(
		'[Modality Table] get current item pending',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemSuccess: createAction(
		'[Modality Table] get current item success',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemError: createAction(
		'[Modality Table] get current item error',
		props<{ controller: string; id: string }>(),
	),

	ClearModalityTable: createAction('[Modality Table] Clear'),
};
