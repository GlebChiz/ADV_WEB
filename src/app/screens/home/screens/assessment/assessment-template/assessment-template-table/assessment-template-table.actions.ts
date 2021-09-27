import { createAction, props } from '@ngrx/store';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { IGridSettings } from 'src/app/shared/interfaces/grid-settings.intarface';
import { IFilter } from 'src/app/shared/table/table.model';

export const AssessmentTemplateTableActions = {
	GetAssessmentTemplateTableDataPending: createAction(
		'[Assessment Template Table] get table data pending',
		props<{ controller: string; filter: IFilter; columns: IColumn[]; gridId: string }>(),
	),
	GetAssessmentTemplateTableDataSuccess: createAction(
		'[Assessment Template Table] get table data success',
	),
	GetAssessmentTemplateTableDataError: createAction(
		'[Assessment Template Table] get table data error',
	),
	UpdateAssessmentTemplateTableState: createAction(
		'[Assessment Template Table] Update',
		props<{ data: any }>(),
	),

	DeleteAssessmentTemplateIemTablePending: createAction(
		'[Assessment Template Table] delete table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DeleteAssessmentTemplateIemTableError: createAction(
		'[Assessment Template Table] delete table item error',
		props<{ error: string }>(),
	),
	DeleteAssessmentTemplateIemTableSuccess: createAction(
		'[Assessment Template Table] delete table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	DublicateAssessmentTemplateIemTablePending: createAction(
		'[Assessment Template Table] duplicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateAssessmentTemplateIemTableError: createAction(
		'[Assessment Template Table] duplicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateAssessmentTemplateIemTableSuccess: createAction(
		'[Assessment Template Table] duplicate table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	CreateAssessmentTemplateIemTablePending: createAction(
		'[Assessment Template Table] create table item pending',
		props<{ controller: string; item: any }>(),
	),
	CreateAssessmentTemplateIemTableError: createAction(
		'[Assessment Template Table] create table item error',
		props<{ controller: string; item: any }>(),
	),
	CreateAssessmentTemplateIemTableSuccess: createAction(
		'[Assessment Template Table] create table item success',
		props<{ controller: string; item: any }>(),
	),

	EditAssessmentTemplateIemTablePending: createAction(
		'[Assessment Template Table] edit table item pending',
		props<{ controller: string; item: any }>(),
	),
	EditAssessmentTemplateIemTableError: createAction(
		'[Assessment Template Table] edit table item error',
		props<{ controller: string; item: any }>(),
	),
	EditAssessmentTemplateIemTableSuccess: createAction(
		'[Assessment Template Table] edit table item success',
		props<{ controller: string; item: any }>(),
	),

	GetCurrentItemPending: createAction(
		'[Assessment Template Table] get current item pending',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemSuccess: createAction(
		'[Assessment Template Table] get current item success',
		props<{ item: any }>(),
	),
	GetCurrentItemError: createAction(
		'[Assessment Template Table] get current item error',
		props<{ controller: string; id: string }>(),
	),
	ClearCurrentAssessmentTemplate: createAction(
		'[Assessment Template Table] Clear current AssessmentTemplate',
	),

	ClearAssessmentTemplateTable: createAction('[Assessment Template Table] Clear'),
	SaveGridSettingsPending: createAction(
		'[Assessment Template Table] save grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridSettingsSuccess: createAction('[Assessment Template Table] save grid settings success'),
	SaveGridSettingsError: createAction('[Assessment Template Table] save grid settings error'),
	SaveGridChnagesPending: createAction(
		'[Assessment Template Table] save grid chnages pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridChnagesSuccess: createAction('[Assessment Template Table] save grid chnages success'),
	SaveGridChnagesError: createAction('[Assessment Template Table] save grid chnages error'),
	GetGridSettingsPending: createAction(
		'[Assessment Template Table] get grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	GetGridSettingsError: createAction('[Assessment Template Table] get grid settings error'),
	GetGridSettingsSuccess: createAction(
		'[Assessment Template Table] get grid settings success',
		props<{ gridSettings: IGridSettings }>(),
	),
	MakeDefaultGridPending: createAction(
		'[Assessment Template Table] make default grid pending',
		props<{ controller: string; id: string }>(),
	),
	MakeDefaultGridError: createAction('[Assessment Template Table] make default grid error'),
	MakeDefaultGridSuccess: createAction(
		'[Assessment Template Table] make default grid success',
		props<{ gridSettings: IGridSettings }>(),
	),
	RenameGridPending: createAction(
		'[Assessment Template Table] rename grid pending',
		props<{ controller: string; id: string }>(),
	),
	RenameGridError: createAction('[Assessment Template Table] rename grid error'),
	RenameGridSuccess: createAction(
		'[Assessment Template Table] rename grid success',
		props<{ gridSettings: IGridSettings }>(),
	),
};
