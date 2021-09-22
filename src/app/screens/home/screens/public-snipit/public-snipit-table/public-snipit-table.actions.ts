import { createAction, props } from '@ngrx/store';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { IGridSettings } from 'src/app/shared/interfaces/grid-settings.intarface';
import { IFilter } from 'src/app/shared/table/table.model';

export const PublicSnipitTableActions = {
	GetPublicSnipitTableDataPending: createAction(
		'[Public Snipit Table] get table data pending',
		props<{ controller: string; filter: IFilter; columns: IColumn[]; gridId: string }>(),
	),
	GetPublicSnipitTableDataSuccess: createAction(
		'[Public Snipit Table] get table data success',
		props<{ controller: string; filter: IFilter }>(),
	),
	ClearCurrentPublicSnipit: createAction(
		'[Public Snipit Table] get table data success',
		props<{ controller: string; filter: IFilter }>(),
	),

	GetPublicSnipitTableDataError: createAction(
		'[Public Snipit Table] get table data error',
		props<{ controller: string; filter: IFilter }>(),
	),
	UpdatePublicSnipitTableState: createAction(
		'[Public Snipit Table] Update',
		props<{ data: any }>(),
	),

	DeletePublicSnipitIemTablePending: createAction(
		'[Public Snipit Table] delete table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DeletePublicSnipitIemTableError: createAction(
		'[Public Snipit Table] delete table item error',
		props<{ error: string }>(),
	),
	DeletePublicSnipitIemTableSuccess: createAction(
		'[Public Snipit Table] delete table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	DublicatePublicSnipitIemTablePending: createAction(
		'[Public Snipit Table] dublicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicatePublicSnipitIemTableError: createAction(
		'[Public Snipit Table] dublicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicatePublicSnipitIemTableSuccess: createAction(
		'[Public Snipit Table] dublicate table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	CreatePublicSnipitIemTablePending: createAction(
		'[Public Snipit Table] create table item pending',
		props<{ controller: string; item: any }>(),
	),
	CreatePublicSnipitIemTableError: createAction(
		'[Public Snipit Table] create table item error',
		props<{ controller: string; item: any }>(),
	),
	CreatePublicSnipitIemTableSuccess: createAction(
		'[Public Snipit Table] create table item success',
		props<{ controller: string; item: any }>(),
	),

	EditPublicSnipitIemTablePending: createAction(
		'[Public Snipit Table] edit table item pending',
		props<{ controller: string; item: any }>(),
	),
	EditPublicSnipitIemTableError: createAction(
		'[Public Snipit Table] edit table item error',
		props<{ controller: string; item: any }>(),
	),
	EditPublicSnipitIemTableSuccess: createAction(
		'[Public Snipit Table] edit table item success',
		props<{ controller: string; item: any }>(),
	),

	GetCurrentItemPending: createAction(
		'[Public Snipit Table] get current item pending',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemSuccess: createAction(
		'[Public Snipit Table] get current item success',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemError: createAction(
		'[Public Snipit Table] get current item error',
		props<{ controller: string; id: string }>(),
	),

	ClearPublicSnipitTable: createAction('[Public Snipit Table] Clear'),
	SaveGridSettingsPending: createAction(
		'[Public Snipit Table] save grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridSettingsSuccess: createAction('[Public Snipit Table] save grid settings success'),
	SaveGridSettingsError: createAction('[Public Snipit Table] save grid settings error'),
	SaveGridChnagesPending: createAction(
		'[Public Snipit Table] save grid chnages pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridChnagesSuccess: createAction('[Public Snipit Table] save grid chnages success'),
	SaveGridChnagesError: createAction('[Public Snipit Table] save grid chnages error'),
	GetGridSettingsPending: createAction(
		'[Public Snipit Table] get grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	GetGridSettingsError: createAction('[Public Snipit Table] get grid settings error'),
	GetGridSettingsSuccess: createAction(
		'[Public Snipit Table] get grid settings success',
		props<{ gridSettings: IGridSettings }>(),
	),
};
