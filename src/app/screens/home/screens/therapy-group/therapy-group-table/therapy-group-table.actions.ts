import { createAction, props } from '@ngrx/store';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { IFilter } from 'src/app/shared/table/table.model';

export const TherapyGroupTableActions = {
	GetTherapyGroupTableDataPending: createAction(
		'[Therapy Group Table] get table data pending',
		props<{ controller: string; filter: IFilter; columns: IColumn[]; gridId: string }>(),
	),
	GetTherapyGroupTableDataSuccess: createAction(
		'[Therapy Group Table] get table data success',
		props<{ controller: string; filter: IFilter }>(),
	),
	GetTherapyGroupTableDataError: createAction(
		'[Therapy Group Table] get table data error',
		props<{ controller: string; filter: IFilter }>(),
	),
	UpdateTherapyGroupTableState: createAction(
		'[Therapy Group Table] Update',
		props<{ data: any }>(),
	),

	DeleteTherapyGroupIemTablePending: createAction(
		'[Therapy Group Table] delete table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DeleteTherapyGroupIemTableError: createAction(
		'[Therapy Group Table] delete table item error',
		props<{ error: string }>(),
	),
	DeleteTherapyGroupIemTableSuccess: createAction(
		'[Therapy Group Table] delete table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	DublicateTherapyGroupIemTablePending: createAction(
		'[Therapy Group Table] dublicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateTherapyGroupIemTableError: createAction(
		'[Therapy Group Table] dublicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateTherapyGroupIemTableSuccess: createAction(
		'[Therapy Group Table] dublicate table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	CreateTherapyGroupIemTablePending: createAction(
		'[Therapy Group Table] create table item pending',
		props<{ controller: string; item: any }>(),
	),
	CreateTherapyGroupIemTableError: createAction(
		'[Therapy Group Table] create table item error',
		props<{ controller: string; item: any }>(),
	),
	CreateTherapyGroupIemTableSuccess: createAction(
		'[Therapy Group Table] create table item success',
		props<{ controller: string; item: any }>(),
	),

	EditTherapyGroupIemTablePending: createAction(
		'[Therapy Group Table] edit table item pending',
		props<{ controller: string; item: any }>(),
	),
	EditTherapyGroupIemTableError: createAction(
		'[Therapy Group Table] edit table item error',
		props<{ controller: string; item: any }>(),
	),
	EditTherapyGroupIemTableSuccess: createAction(
		'[Therapy Group Table] edit table item success',
		props<{ controller: string; item: any }>(),
	),

	GetCurrentItemPending: createAction(
		'[Therapy Group Table] get current item pending',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemSuccess: createAction(
		'[Therapy Group Table] get current item success',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemError: createAction(
		'[Therapy Group Table] get current item error',
		props<{ controller: string; id: string }>(),
	),
	ClearCurrentTherapyGroup: createAction('[Therapy Group Table] Clear current TherapyGroup'),

	ClearTherapyGroupTable: createAction('[Therapy Group Table] Clear'),
};
