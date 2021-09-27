import { createAction, props } from '@ngrx/store';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { IGridSettings } from 'src/app/shared/interfaces/grid-settings.intarface';
import { IFilter } from 'src/app/shared/table/table.model';

export const InsuranceTableActions = {
	GetInsuranceTableDataPending: createAction(
		'[Insurance Table] get table data pending',
		props<{ controller: string; filter: IFilter; columns: IColumn[]; gridId: string }>(),
	),
	GetInsuranceTableDataSuccess: createAction(
		'[Insurance Table] get table data success',
		props<{ controller: string; filter: IFilter }>(),
	),
	GetInsuranceTableDataError: createAction(
		'[Insurance Table] get table data error',
		props<{ controller: string; filter: IFilter }>(),
	),
	UpdateInsuranceTableState: createAction('[Insurance Table] Update', props<{ data: any }>()),

	DeleteInsuranceIemTablePending: createAction(
		'[Insurance Table] delete table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DeleteInsuranceIemTableError: createAction(
		'[Insurance Table] delete table item error',
		props<{ error: string }>(),
	),
	DeleteInsuranceIemTableSuccess: createAction(
		'[Insurance Table] delete table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	DublicateInsuranceIemTablePending: createAction(
		'[Insurance Table] duplicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateInsuranceIemTableError: createAction(
		'[Insurance Table] duplicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateInsuranceIemTableSuccess: createAction(
		'[Insurance Table] duplicate table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	CreateInsuranceIemTablePending: createAction(
		'[Insurance Table] create table item pending',
		props<{ controller: string; item: any }>(),
	),
	CreateInsuranceIemTableError: createAction(
		'[Insurance Table] create table item error',
		props<{ controller: string; item: any }>(),
	),
	CreateInsuranceIemTableSuccess: createAction(
		'[Insurance Table] create table item success',
		props<{ controller: string; item: any }>(),
	),

	EditInsuranceIemTablePending: createAction(
		'[Insurance Table] edit table item pending',
		props<{ controller: string; item: any }>(),
	),
	EditInsuranceIemTableError: createAction(
		'[Insurance Table] edit table item error',
		props<{ controller: string; item: any }>(),
	),
	EditInsuranceIemTableSuccess: createAction(
		'[Insurance Table] edit table item success',
		props<{ controller: string; item: any }>(),
	),

	GetCurrentItemPending: createAction(
		'[Insurance Table] get current item pending',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemSuccess: createAction(
		'[Insurance Table] get current item success',
		props<{ item: any }>(),
	),
	GetCurrentItemError: createAction(
		'[Insurance Table] get current item error',
		props<{ controller: string; id: string }>(),
	),
	ClearCurrentInsurance: createAction('[Insurance Table] Clear current Insurance'),

	ClearInsuranceTable: createAction('[Modality Table] Clear'),
	GetCurrentInsurancePending: createAction(
		'[Insurance Table] Get current insurance pending',
		props<{ id: string }>(),
	),
	GetCurrentInsuranceSuccess: createAction(
		'[Insurance Table] Get current insurance success',
		props<{ insurance: any }>(),
	),
	GetCurrentInsuranceError: createAction('[Insurance Table] Get current insurance error'),
	GetOtherInsurancePending: createAction(
		'[Insurance Table] Get Other insurance pending',
		props<{ id: string }>(),
	),
	GetOtherInsuranceSuccess: createAction(
		'[Insurance Table] Get Other insurance success',
		props<{ insurance: any }>(),
	),
	GetOtherInsuranceError: createAction('[Insurance Table] Get Other insurance error'),
	SaveGridSettingsPending: createAction(
		'[Insurance Table] save grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridSettingsSuccess: createAction('[Insurance Table] save grid settings success'),
	SaveGridSettingsError: createAction('[Insurance Table] save grid settings error'),
	SaveGridChnagesPending: createAction(
		'[Insurance Table] save grid chnages pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridChnagesSuccess: createAction('[Insurance Table] save grid chnages success'),
	SaveGridChnagesError: createAction('[Insurance Table] save grid chnages error'),
	GetGridSettingsPending: createAction(
		'[Insurance Table] get grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	GetGridSettingsError: createAction('[Insurance Table] get grid settings error'),
	GetGridSettingsSuccess: createAction(
		'[Insurance Table] get grid settings success',
		props<{ gridSettings: IGridSettings }>(),
	),
	MakeDefaultGridPending: createAction(
		'[Insurance Table] make default grid pending',
		props<{ controller: string; id: string }>(),
	),
	MakeDefaultGridError: createAction('[Insurance Table] make default grid error'),
	MakeDefaultGridSuccess: createAction(
		'[Insurance Table] make default grid success',
		props<{ gridSettings: IGridSettings }>(),
	),
	RenameGridPending: createAction(
		'[Insurance Table] rename grid pending',
		props<{ controller: string; id: string }>(),
	),
	RenameGridError: createAction('[Insurance Table] rename grid error'),
	RenameGridSuccess: createAction(
		'[Insurance Table] rename grid success',
		props<{ gridSettings: IGridSettings }>(),
	),
};
