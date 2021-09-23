import { createAction, props } from '@ngrx/store';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { IGridSettings } from 'src/app/shared/interfaces/grid-settings.intarface';
import { IFilter } from 'src/app/shared/table/table.model';

export const LocationTableActions = {
	GetLocationTableDataPending: createAction(
		'[Location Table] get table data pending',
		props<{ controller: string; filter: IFilter; columns: IColumn[]; gridId: string }>(),
	),

	GetLocationTableDataSuccess: createAction(
		'[Location Table] get table data success',
		props<{ controller: string; filter: IFilter }>(),
	),

	GetLocationTableDataError: createAction(
		'[Location Table] get table data error',
		props<{ controller: string; filter: IFilter }>(),
	),

	UpdateLocationTableState: createAction('[Location Table] Update', props<{ data: any }>()),

	DeleteLocationIemTablePending: createAction(
		'[Location Table] delete table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DeleteLocationIemTableError: createAction(
		'[Location Table] delete table item error',
		props<{ error: string }>(),
	),
	DeleteLocationIemTableSuccess: createAction(
		'[Location Table] delete table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	DublicateLocationIemTablePending: createAction(
		'[Location Table] dublicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateLocationIemTableSuccess: createAction(
		'[Location Table] dublicate table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateLocationIemTableError: createAction(
		'[Location Table] dublicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	CreateLocationIemTablePending: createAction(
		'[Location Table] create table item pending',
		props<{ controller: string; item: any }>(),
	),
	CreateLocationIemTableSuccess: createAction(
		'[Location Table] create table item success',
		props<{ controller: string; item: any }>(),
	),
	CreateLocationIemTableError: createAction(
		'[Location Table] create table item error',
		props<{ controller: string; item: any }>(),
	),

	EditLocationIemTablePending: createAction(
		'[Location Table] edit table item pending',
		props<{ controller: string; item: any }>(),
	),
	EditLocationIemTableSuccess: createAction(
		'[Location Table] edit table item success',
		props<{ controller: string; item: any }>(),
	),
	EditLocationIemTableError: createAction(
		'[Location Table] edit table item error',
		props<{ controller: string; item: any }>(),
	),

	GetCurrentItemPending: createAction(
		'[Location Table] get current item pending',
		props<{ controller: string; id: string }>(),
	),

	GetCurrentItemSuccess: createAction(
		'[Location Table] get current item success',
		props<{ controller: string; id: string }>(),
	),

	GetCurrentItemError: createAction(
		'[Location Table] get current item error',
		props<{ controller: string; id: string }>(),
	),

	ClearCurrentLocation: createAction('[Location Table] Clear current Location'),

	ClearLocationTable: createAction('[Location Table] Clear'),
	SaveGridSettingsPending: createAction(
		'[Location Table] save grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridSettingsSuccess: createAction('[Location Table] save grid settings success'),
	SaveGridSettingsError: createAction('[Location Table] save grid settings error'),
	SaveGridChnagesPending: createAction(
		'[Location Table] save grid chnages pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridChnagesSuccess: createAction('[Location Table] save grid chnages success'),
	SaveGridChnagesError: createAction('[Location Table] save grid chnages error'),
	GetGridSettingsPending: createAction(
		'[Location Table] get grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	GetGridSettingsError: createAction('[Location Table] get grid settings error'),
	GetGridSettingsSuccess: createAction(
		'[Location Table] get grid settings success',
		props<{ gridSettings: IGridSettings }>(),
	),
	MakeDefaultGridPending: createAction(
		'[Location Table] make default grid pending',
		props<{ controller: string; id: string }>(),
	),
	MakeDefaultGridError: createAction('[Location Table] make default grid error'),
	MakeDefaultGridSuccess: createAction(
		'[Location Table] make default grid success',
		props<{ gridSettings: IGridSettings }>(),
	),
	RenameGridPending: createAction(
		'[Location Table] rename grid pending',
		props<{ controller: string; id: string }>(),
	),
	RenameGridError: createAction('[Location Table] rename grid error'),
	RenameGridSuccess: createAction(
		'[Location Table] rename grid success',
		props<{ gridSettings: IGridSettings }>(),
	),
};
