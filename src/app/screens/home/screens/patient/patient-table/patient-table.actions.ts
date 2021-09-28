import { createAction, props } from '@ngrx/store';
import { IPatientGeneralInfo } from 'src/app/shared/components/patient-general-info/patient-general-info.component';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { IGridSettings } from 'src/app/shared/interfaces/grid-settings.intarface';
import { IFilter } from 'src/app/shared/table/table.model';

export const PatientTableActions = {
	GetPatientTableDataPending: createAction(
		'[Patient Table] get table data pending',
		props<{ controller: string; filter: IFilter; columns: IColumn[]; gridId: string }>(),
	),
	GetPatientTableDataSuccess: createAction('[Patient Table] get table data success'),
	ClearCurrentPatient: createAction('[Patient Table] get table data success'),
	GetPatientTableDataError: createAction('[Patient Table] get table data error'),
	UpdatePatientTableState: createAction('[Patient Table] Update', props<{ data: any }>()),

	DeletePatientIemTablePending: createAction(
		'[Patient Table] delete table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DeletePatientIemTableError: createAction(
		'[Patient Table] delete table item error',
		props<{ error: string }>(),
	),
	DeletePatientIemTableSuccess: createAction(
		'[Patient Table] delete table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	DublicatePatientIemTablePending: createAction(
		'[Patient Table] duplicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicatePatientIemTableError: createAction(
		'[Patient Table] duplicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicatePatientIemTableSuccess: createAction(
		'[Patient Table] duplicate table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	CreatePatientIemTablePending: createAction(
		'[Patient Table] create table item pending',
		props<{ controller: string; item: any }>(),
	),
	CreatePatientIemTableError: createAction(
		'[Patient Table] create table item error',
		props<{ controller: string; item: any }>(),
	),
	CreatePatientIemTableSuccess: createAction(
		'[Patient Table] create table item success',
		props<{ controller: string; item: any }>(),
	),

	EditPatientIemTablePending: createAction(
		'[Patient Table] edit table item pending',
		props<{ controller: string; item: any }>(),
	),
	EditPatientIemTableError: createAction(
		'[Patient Table] edit table item error',
		props<{ controller: string; item: any }>(),
	),
	EditPatientIemTableSuccess: createAction(
		'[Patient Table] edit table item success',
		props<{ controller: string; item: any }>(),
	),

	GetCurrentItemPending: createAction(
		'[Patient Table] get current item pending',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemSuccess: createAction(
		'[Patient Table] get current item success',
		props<{ item: any }>(),
	),
	GetCurrentItemError: createAction(
		'[Patient Table] get current item error',
		props<{ controller: string; id: string }>(),
	),
	ClearPatientTable: createAction('[Patient Table] Clear'),

	GetPatientGeneralInfoPending: createAction(
		'[Patient Table] Get patient general info pending',
		props<{ id: string }>(),
	),
	GetPatientGeneralInfoSuccess: createAction(
		'[Patient Table] Get patient general info success',
		props<{ patientInfo: IPatientGeneralInfo }>(),
	),
	GetPatientGeneralInfoError: createAction('[Patient Table] Get patient general info error'),
	UpdatePatientGeneralInfoPending: createAction(
		'[Patient Table] Update patient general info pending',
		props<{ id: string; patientInfo: IPatientGeneralInfo }>(),
	),
	UpdatePatientGeneralInfoSuccess: createAction(
		'[Patient Table] Update patient general info success',
	),
	UpdatePatientGeneralInfoError: createAction('[Patient Table] Update patient general info error'),
	SaveGridSettingsPending: createAction(
		'[Patient Table] save grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridSettingsSuccess: createAction('[Patient Table] save grid settings success'),
	SaveGridSettingsError: createAction('[Patient Table] save grid settings error'),
	SaveGridChnagesPending: createAction(
		'[Patient Table] save grid chnages pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridChnagesSuccess: createAction('[Patient Table] save grid chnages success'),
	SaveGridChnagesError: createAction('[Patient Table] save grid chnages error'),
	GetGridSettingsPending: createAction(
		'[Patient Table] get grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	GetGridSettingsError: createAction('[Patient Table] get grid settings error'),
	GetGridSettingsSuccess: createAction(
		'[Patient Table] get grid settings success',
		props<{ gridSettings: IGridSettings }>(),
	),
	MakeDefaultGridPending: createAction(
		'[Patient Table] make default grid pending',
		props<{ controller: string; id: string }>(),
	),
	MakeDefaultGridError: createAction('[Patient Table] make default grid error'),
	MakeDefaultGridSuccess: createAction(
		'[Patient Table] make default grid success',
		props<{ gridSettings: IGridSettings }>(),
	),
	RenameGridPending: createAction(
		'[Patient Table] rename grid pending',
		props<{ controller: string; id: string }>(),
	),
	RenameGridError: createAction('[Patient Table] rename grid error'),
	RenameGridSuccess: createAction(
		'[Patient Table] rename grid success',
		props<{ gridSettings: IGridSettings }>(),
	),
};
