import { createAction, props } from '@ngrx/store';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { IGridSettings } from 'src/app/shared/interfaces/grid-settings.intarface';
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
		'[Room Table] duplicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateRoomIemTableError: createAction(
		'[Room Table] duplicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateRoomIemTableSuccess: createAction(
		'[Room Table] duplicate table item success',
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
		props<{ item: any }>(),
	),
	GetCurrentItemError: createAction(
		'[Room Table] get current item error',
		props<{ controller: string; id: string }>(),
	),
	ClearCurrentRoom: createAction('[Room Table] Clear current Room'),

	ClearRoomTable: createAction('[Room Table] Clear'),
	SaveGridSettingsPending: createAction(
		'[Room Table] save grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridSettingsSuccess: createAction('[Room Table] save grid settings success'),
	SaveGridSettingsError: createAction('[Room Table] save grid settings error'),
	SaveGridChnagesPending: createAction(
		'[Room Table] save grid chnages pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridChnagesSuccess: createAction('[Room Table] save grid chnages success'),
	SaveGridChnagesError: createAction('[Room Table] save grid chnages error'),
	GetGridSettingsPending: createAction(
		'[Room Table] get grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	GetGridSettingsError: createAction('[Room Table] get grid settings error'),
	GetGridSettingsSuccess: createAction(
		'[Room Table] get grid settings success',
		props<{ gridSettings: IGridSettings }>(),
	),
	MakeDefaultGridPending: createAction(
		'[Room Table] make default grid pending',
		props<{ controller: string; id: string }>(),
	),
	MakeDefaultGridError: createAction('[Room Table] make default grid error'),
	MakeDefaultGridSuccess: createAction(
		'[Room Table] make default grid success',
		props<{ gridSettings: IGridSettings }>(),
	),
	RenameGridPending: createAction(
		'[Room Table] rename grid pending',
		props<{ controller: string; id: string }>(),
	),
	RenameGridError: createAction('[Room Table] rename grid error'),
	RenameGridSuccess: createAction(
		'[Room Table] rename grid success',
		props<{ gridSettings: IGridSettings }>(),
	),
};
