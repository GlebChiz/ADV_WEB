import { createAction, props } from '@ngrx/store';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { IFilter } from 'src/app/shared/table/table.model';
import { IGridSettings } from 'src/app/shared/interfaces/grid-settings.intarface';

export const UsersManagerTableActions = {
	GetUserTableDataPending: createAction(
		'[User Table] get table data pending',
		props<{ controller: string; filter: IFilter; columns: IColumn[]; gridId: string }>(),
	),
	GetUserTableDataSuccess: createAction(
		'[User Table] get table data success',
		props<{ controller: string; filter: IFilter }>(),
	),
	GetUserTableDataError: createAction(
		'[User Table] get table data error',
		props<{ controller: string; filter: IFilter }>(),
	),
	UpdateUserTableState: createAction('[User Table] Update', props<{ data: any }>()),

	DeleteUserIemTablePending: createAction(
		'[User Table] delete table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DeleteUserIemTableError: createAction(
		'[User Table] delete table item error',
		props<{ error: string }>(),
	),
	DeleteUserIemTableSuccess: createAction(
		'[User Table] delete table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	DublicateUserIemTablePending: createAction(
		'[User Table] dublicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateUserIemTableError: createAction(
		'[User Table] dublicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateUserIemTableSuccess: createAction(
		'[User Table] dublicate table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	CreateUserIemTablePending: createAction(
		'[User Table] create table item pending',
		props<{ controller: string; item: any }>(),
	),
	CreateUserIemTableError: createAction(
		'[User Table] create table item error',
		props<{ controller: string; item: any }>(),
	),
	CreateUserIemTableSuccess: createAction(
		'[User Table] create table item success',
		props<{ controller: string; item: any }>(),
	),

	EditUserIemTablePending: createAction(
		'[User Table] edit table item pending',
		props<{ controller: string; item: any }>(),
	),
	EditUserIemTableError: createAction(
		'[User Table] edit table item error',
		props<{ controller: string; item: any }>(),
	),
	EditUserIemTableSuccess: createAction(
		'[User Table] edit table item success',
		props<{ controller: string; item: any }>(),
	),

	GetCurrentItemPending: createAction(
		'[User Table] get current item pending',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemSuccess: createAction(
		'[User Table] get current item success',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemError: createAction(
		'[User Table] get current item error',
		props<{ controller: string; id: string }>(),
	),
	ClearCurrentUser: createAction('[User Table] Clear current User'),

	ClearUserTable: createAction('[User Table] Clear'),
	SaveGridSettingsPending: createAction(
		'[User Table] save grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridSettingsSuccess: createAction('[User Table] save grid settings success'),
	SaveGridSettingsError: createAction('[User Table] save grid settings error'),
	SaveGridChangesPending: createAction(
		'[User Table] save grid changes pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridChangesSuccess: createAction('[User Table] save grid changes success'),
	SaveGridChangesError: createAction('[User Table] save grid changes error'),
	GetGridSettingsPending: createAction(
		'[User Table] get grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	GetGridSettingsError: createAction('[User Table] get grid settings error'),
	GetGridSettingsSuccess: createAction(
		'[User Table] get grid settings success',
		props<{ gridSettings: IGridSettings }>(),
	),
	MakeDefaultGridPending: createAction(
		'[User Table] make default grid pending',
		props<{ controller: string; id: string }>(),
	),
	MakeDefaultGridError: createAction('[User Table] make default grid error'),
	MakeDefaultGridSuccess: createAction(
		'[User Table] make default grid success',
		props<{ gridSettings: IGridSettings }>(),
	),
	RenameGridPending: createAction(
		'[User Table] rename grid pending',
		props<{ controller: string; id: string }>(),
	),
	RenameGridError: createAction('[User Table] rename grid error'),
	RenameGridSuccess: createAction(
		'[User Table] rename grid success',
		props<{ gridSettings: IGridSettings }>(),
	),
};
