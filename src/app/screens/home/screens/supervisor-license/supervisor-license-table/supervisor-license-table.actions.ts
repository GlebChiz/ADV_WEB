import { createAction, props } from '@ngrx/store';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { IGridSettings } from 'src/app/shared/interfaces/grid-settings.intarface';
import { IFilter } from 'src/app/shared/table/table.model';

export const SupervisorLicenseTableActions = {
	GetSupervisorLicenseTableDataPending: createAction(
		'[Supervisor Credentials Table] get table data pending',
		props<{ controller: string; filter: IFilter; columns: IColumn[]; gridId: string }>(),
	),
	GetSupervisorLicenseTableDataSuccess: createAction(
		'[Supervisor Credentials Table] get table data success',
		props<{ controller: string; filter: IFilter }>(),
	),
	GetSupervisorLicenseTableDataError: createAction(
		'[Supervisor Credentials Table] get table data error',
		props<{ controller: string; filter: IFilter }>(),
	),
	UpdateSupervisorLicenseTableState: createAction(
		'[Supervisor Credentials Table] Update',
		props<{ data: any }>(),
	),

	DeleteSupervisorLicenseIemTablePending: createAction(
		'[Supervisor Credentials Table] delete table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DeleteSupervisorLicenseIemTableError: createAction(
		'[Supervisor Credentials Table] delete table item error',
		props<{ error: string }>(),
	),
	DeleteSupervisorLicenseIemTableSuccess: createAction(
		'[Supervisor Credentials Table] delete table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	DublicateSupervisorLicenseIemTablePending: createAction(
		'[Supervisor Credentials Table] duplicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateSupervisorLicenseIemTableError: createAction(
		'[Supervisor Credentials Table] duplicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateSupervisorLicenseIemTableSuccess: createAction(
		'[Supervisor Credentials Table] duplicate table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	CreateSupervisorLicenseIemTablePending: createAction(
		'[Supervisor Credentials Table] create table item pending',
		props<{ controller: string; item: any }>(),
	),
	CreateSupervisorLicenseIemTableError: createAction(
		'[Supervisor Credentials Table] create table item error',
		props<{ controller: string; item: any }>(),
	),
	CreateSupervisorLicenseIemTableSuccess: createAction(
		'[Supervisor Credentials Table] create table item success',
		props<{ controller: string; item: any }>(),
	),

	EditSupervisorLicenseIemTablePending: createAction(
		'[Supervisor Credentials Table] edit table item pending',
		props<{ controller: string; item: any }>(),
	),
	EditSupervisorLicenseIemTableError: createAction(
		'[Supervisor Credentials Table] edit table item error',
		props<{ controller: string; item: any }>(),
	),
	EditSupervisorLicenseIemTableSuccess: createAction(
		'[Supervisor Credentials Table] edit table item success',
		props<{ controller: string; item: any }>(),
	),

	GetCurrentItemPending: createAction(
		'[Supervisor Credentials Table] get current item pending',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemSuccess: createAction(
		'[Supervisor Credentials Table] get current item success',
		props<{ item: any }>(),
	),
	GetCurrentItemError: createAction(
		'[Supervisor Credentials Table] get current item error',
		props<{ controller: string; id: string }>(),
	),
	ClearCurrentSupervisorLicense: createAction(
		'[Supervisor Credentials Table] Clear current SupervisorLicense',
	),

	ClearSupervisorLicenseTable: createAction('[Supervisor Credentials Table] Clear'),
	SaveGridSettingsPending: createAction(
		'[Supervisor Credentials Table] save grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridSettingsSuccess: createAction(
		'[Supervisor Credentials Table] save grid settings success',
	),
	SaveGridSettingsError: createAction('[Supervisor Credentials Table] save grid settings error'),
	SaveGridChnagesPending: createAction(
		'[Supervisor Credentials Table] save grid chnages pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridChnagesSuccess: createAction('[Supervisor Credentials Table] save grid chnages success'),
	SaveGridChnagesError: createAction('[Supervisor Credentials Table] save grid chnages error'),
	GetGridSettingsPending: createAction(
		'[Supervisor Credentials Table] get grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	GetGridSettingsError: createAction('[Supervisor Credentials Table] get grid settings error'),
	GetGridSettingsSuccess: createAction(
		'[Supervisor Credentials Table] get grid settings success',
		props<{ gridSettings: IGridSettings }>(),
	),
	MakeDefaultGridPending: createAction(
		'[Supervisor Credentials Table] make default grid pending',
		props<{ controller: string; id: string }>(),
	),
	MakeDefaultGridError: createAction('[Supervisor Credentials Table] make default grid error'),
	MakeDefaultGridSuccess: createAction(
		'[Supervisor Credentials Table] make default grid success',
		props<{ gridSettings: IGridSettings }>(),
	),
	RenameGridPending: createAction(
		'[Supervisor Credentials Table] rename grid pending',
		props<{ controller: string; id: string }>(),
	),
	RenameGridError: createAction('[Supervisor Credentials Table] rename grid error'),
	RenameGridSuccess: createAction(
		'[Supervisor Credentials Table] rename grid success',
		props<{ gridSettings: IGridSettings }>(),
	),
};
