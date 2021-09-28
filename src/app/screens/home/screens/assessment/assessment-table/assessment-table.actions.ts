import { createAction, props } from '@ngrx/store';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { IGridSettings } from 'src/app/shared/interfaces/grid-settings.intarface';
import { IFilter } from 'src/app/shared/table/table.model';

export const AssessmentTableActions = {
	GetAssessmentTableDataPending: createAction(
		'[Assessment Table] get table data pending',
		props<{ controller: string; filter: IFilter; columns: IColumn[]; gridId: string }>(),
	),
	GetAssessmentTableDataSuccess: createAction('[Assessment Table] get table data success'),
	GetAssessmentTableDataError: createAction('[Assessment Table] get table data error'),
	UpdateAssessmentTableState: createAction('[Assessment Table] Update', props<{ data: any }>()),

	DeleteAssessmentIemTablePending: createAction(
		'[Assessment Table] delete table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DeleteAssessmentIemTableError: createAction(
		'[Assessment Table] delete table item error',
		props<{ error: string }>(),
	),
	DeleteAssessmentIemTableSuccess: createAction(
		'[Assessment Table] delete table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	DublicateAssessmentIemTablePending: createAction(
		'[Assessment Table] duplicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateAssessmentIemTableError: createAction(
		'[Assessment Table] duplicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateAssessmentIemTableSuccess: createAction(
		'[Assessment Table] duplicate table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	CreateAssessmentIemTablePending: createAction(
		'[Assessment Table] create table item pending',
		props<{ controller: string; item: any }>(),
	),
	CreateAssessmentIemTableError: createAction(
		'[Assessment Table] create table item error',
		props<{ controller: string; item: any }>(),
	),
	CreateAssessmentIemTableSuccess: createAction(
		'[Assessment Table] create table item success',
		props<{ controller: string; item: any }>(),
	),

	EditAssessmentIemTablePending: createAction(
		'[Assessment Table] edit table item pending',
		props<{ controller: string; item: any }>(),
	),
	EditAssessmentIemTableError: createAction(
		'[Assessment Table] edit table item error',
		props<{ controller: string; item: any }>(),
	),
	EditAssessmentIemTableSuccess: createAction(
		'[Assessment Table] edit table item success',
		props<{ controller: string; item: any }>(),
	),

	GetCurrentItemPending: createAction(
		'[Assessment Table] get current item pending',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemSuccess: createAction(
		'[Assessment Table] get current item success',
		props<{ item: any }>(),
	),
	GetCurrentItemError: createAction(
		'[Assessment Table] get current item error',
		props<{ controller: string; id: string }>(),
	),
	ClearCurrentAssessment: createAction('[Assessment Table] Clear current Assessment'),
	ClearAssessmentTable: createAction('[Assessment Table] Clear'),
	SaveGridSettingsPending: createAction(
		'[Assessment Table] save grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridSettingsSuccess: createAction('[Assessment Table] save grid settings success'),
	SaveGridSettingsError: createAction('[Assessment Table] save grid settings error'),
	SaveGridChnagesPending: createAction(
		'[Assessment Table] save grid chnages pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridChnagesSuccess: createAction('[Assessment Table] save grid chnages success'),
	SaveGridChnagesError: createAction('[Assessment Table] save grid chnages error'),
	GetGridSettingsPending: createAction(
		'[Assessment Table] get grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	GetGridSettingsError: createAction('[Assessment Table] get grid settings error'),
	GetGridSettingsSuccess: createAction(
		'[Assessment Table] get grid settings success',
		props<{ gridSettings: IGridSettings }>(),
	),
	MakeDefaultGridPending: createAction(
		'[Assessment Table] make default grid pending',
		props<{ controller: string; id: string }>(),
	),
	MakeDefaultGridError: createAction('[Assessment Table] make default grid error'),
	MakeDefaultGridSuccess: createAction(
		'[Assessment Table] make default grid success',
		props<{ gridSettings: IGridSettings }>(),
	),
	RenameGridPending: createAction(
		'[Assessment Table] rename grid pending',
		props<{ controller: string; id: string }>(),
	),
	RenameGridError: createAction('[Assessment Table] rename grid error'),
	RenameGridSuccess: createAction(
		'[Assessment Table] rename grid success',
		props<{ gridSettings: IGridSettings }>(),
	),
};
