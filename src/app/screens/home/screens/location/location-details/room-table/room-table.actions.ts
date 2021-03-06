import { createAction, props } from '@ngrx/store';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { IFilter } from 'src/app/shared/table/table.model';

export const RoomTableActions = {
	GetRoomTableDataPending: createAction(
		'[Room Table] get table data pending',
		props<{ controller: string; filter: IFilter; columns: IColumn[]; gridId: string }>(),
	),
	GetRoomTableDataSuccess: createAction(
		'[Room Table] get table data success',
		props<{ controller: string; filter: IFilter }>(),
	),
	GetRoomTableDataError: createAction(
		'[Room Table] get table data error',
		props<{ controller: string; filter: IFilter }>(),
	),
	UpdateRoomTableState: createAction('[Room Table] Update', props<{ data: any }>()),

	DeleteRoomIemTablePending: createAction(
		'[Room Table] delete table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DeleteRoomIemTableError: createAction(
		'[Room Table] delete table item error',
		props<{ error: string }>(),
	),
	DeleteRoomIemTableSuccess: createAction(
		'[Room Table] delete table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	DublicateRoomIemTablePending: createAction(
		'[Room Table] dublicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateRoomIemTableError: createAction(
		'[Room Table] dublicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateRoomIemTableSuccess: createAction(
		'[Room Table] dublicate table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	CreateRoomIemTablePending: createAction(
		'[Room Table] create table item pending',
		props<{ controller: string; item: any }>(),
	),
	CreateRoomIemTableError: createAction(
		'[Room Table] create table item error',
		props<{ controller: string; item: any }>(),
	),
	CreateRoomIemTableSuccess: createAction(
		'[Room Table] create table item success',
		props<{ controller: string; item: any }>(),
	),

	EditRoomIemTablePending: createAction(
		'[Room Table] edit table item pending',
		props<{ controller: string; item: any }>(),
	),
	EditRoomIemTableError: createAction(
		'[Room Table] edit table item error',
		props<{ controller: string; item: any }>(),
	),
	EditRoomIemTableSuccess: createAction(
		'[Room Table] edit table item success',
		props<{ controller: string; item: any }>(),
	),

	GetCurrentItemPending: createAction(
		'[Room Table] get current item pending',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemSuccess: createAction(
		'[Room Table] get current item success',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemError: createAction(
		'[Room Table] get current item error',
		props<{ controller: string; id: string }>(),
	),
	ClearCurrentRoom: createAction('[Room Table] Clear current Room'),

	ClearRoomTable: createAction('[Room Table] Clear'),
};
