import { createAction, props } from '@ngrx/store';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { IGridSettings } from 'src/app/shared/interfaces/grid-settings.intarface';
import { IFilter } from 'src/app/shared/table/table.model';

export const PatientDistributionTableActions = {
	GetPatientDistributionTableDataPending: createAction(
		'[Patient Distribution Table] get table data pending',
		props<{ controller: string; filter: IFilter; columns: IColumn[]; gridId: string }>(),
	),
	GetPatientDistributionTableDataSuccess: createAction(
		'[Patient Distribution Table] get table data success',
		props<{ controller: string; filter: IFilter }>(),
	),
	GetPatientDistributionTableDataError: createAction(
		'[Patient Distribution Table] get table data error',
		props<{ controller: string; filter: IFilter }>(),
	),
	UpdatePatientDistributionTableState: createAction(
		'[Patient Distribution Table] Update',
		props<{ data: any }>(),
	),

	DeletePatientDistributionIemTablePending: createAction(
		'[Patient Distribution Table] delete table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DeletePatientDistributionIemTableError: createAction(
		'[Patient Distribution Table] delete table item error',
		props<{ error: string }>(),
	),
	DeletePatientDistributionIemTableSuccess: createAction(
		'[Patient Distribution Table] delete table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	DublicatePatientDistributionIemTablePending: createAction(
		'[Patient Distribution Table] duplicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicatePatientDistributionIemTableError: createAction(
		'[Patient Distribution Table] duplicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicatePatientDistributionIemTableSuccess: createAction(
		'[Patient Distribution Table] duplicate table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	CreatePatientDistributionIemTablePending: createAction(
		'[Patient Distribution Table] create table item pending',
		props<{ controller: string; item: any }>(),
	),
	CreatePatientDistributionIemTableError: createAction(
		'[Patient Distribution Table] create table item error',
		props<{ controller: string; item: any }>(),
	),
	CreatePatientDistributionIemTableSuccess: createAction(
		'[Patient Distribution Table] create table item success',
		props<{ controller: string; item: any }>(),
	),

	EditPatientDistributionIemTablePending: createAction(
		'[Patient Distribution Table] edit table item pending',
		props<{ controller: string; item: any }>(),
	),
	EditPatientDistributionIemTableError: createAction(
		'[Patient Distribution Table] edit table item error',
		props<{ controller: string; item: any }>(),
	),
	EditPatientDistributionIemTableSuccess: createAction(
		'[Patient Distribution Table] edit table item success',
		props<{ controller: string; item: any }>(),
	),

	GetCurrentItemPending: createAction(
		'[Patient Distribution Table] get current item pending',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemSuccess: createAction(
		'[Patient Distribution Table] get current item success',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemError: createAction(
		'[Patient Distribution Table] get current item error',
		props<{ controller: string; id: string }>(),
	),
	ClearCurrentPatientDistribution: createAction(
		'[Patient Distribution Table] Clear current PatientDistribution',
	),
	ClearPatientDistributionTable: createAction('[Patient Distribution Table] Clear'),
	UpdateFiledPatientDistributionPending: createAction(
		'[Patient Distribution] Update filed patient distribution pending',
		props<{ patientIds: string[]; supervisorId: string; start: Date; controller: string }>(),
	),
	UpdateFiledPatientDistributionError: createAction(
		'[Patient Distribution] Update filed patient distribution error',
	),
	UpdateFiledPatientDistributionSuccess: createAction(
		'[Patient Distribution] Update filed patient distribution success',
	),
	SaveGridSettingsPending: createAction(
		'[Patient Distribution] save grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridSettingsSuccess: createAction('[Patient Distribution] save grid settings success'),
	SaveGridSettingsError: createAction('[Patient Distribution] save grid settings error'),
	SaveGridChnagesPending: createAction(
		'[Patient Distribution] save grid chnages pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridChnagesSuccess: createAction('[Patient Distribution] save grid chnages success'),
	SaveGridChnagesError: createAction('[Patient Distribution] save grid chnages error'),
	GetGridSettingsPending: createAction(
		'[Patient Distribution] get grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	GetGridSettingsError: createAction('[Patient Distribution] get grid settings error'),
	GetGridSettingsSuccess: createAction(
		'[Patient Distribution] get grid settings success',
		props<{ gridSettings: IGridSettings }>(),
	),
	MakeDefaultGridPending: createAction(
		'[Patient Distribution] make default grid pending',
		props<{ controller: string; id: string }>(),
	),
	MakeDefaultGridError: createAction('[Patient Distribution] make default grid error'),
	MakeDefaultGridSuccess: createAction(
		'[Patient Distribution] make default grid success',
		props<{ gridSettings: IGridSettings }>(),
	),
	RenameGridPending: createAction(
		'[Patient Distribution] rename grid pending',
		props<{ controller: string; id: string }>(),
	),
	RenameGridError: createAction('[Patient Distribution] rename grid error'),
	RenameGridSuccess: createAction(
		'[Patient Distribution] rename grid success',
		props<{ gridSettings: IGridSettings }>(),
	),
};
