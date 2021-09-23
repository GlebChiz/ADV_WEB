import { createAction, props } from '@ngrx/store';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { IGridSettings } from 'src/app/shared/interfaces/grid-settings.intarface';
import { IFilter } from 'src/app/shared/table/table.model';

export const AssessmentLegendTableActions = {
	GetAssessmentLegendTableDataPending: createAction(
		'[Assessment Legend Table] get table data pending',
		props<{ controller: string; filter: IFilter; columns: IColumn[]; gridId: string }>(),
	),
	GetAssessmentLegendTableDataSuccess: createAction(
		'[Assessment Legend Table] get table data success',
		props<{ controller: string; filter: IFilter }>(),
	),
	GetAssessmentLegendTableDataError: createAction(
		'[Assessment Legend Table] get table data error',
		props<{ controller: string; filter: IFilter }>(),
	),
	UpdateAssessmentLegendTableState: createAction(
		'[Assessment Legend Table] Update',
		props<{ data: any }>(),
	),

	DeleteAssessmentLegendIemTablePending: createAction(
		'[Assessment Legend Table] delete table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DeleteAssessmentLegendIemTableError: createAction(
		'[Assessment Legend Table] delete table item error',
		props<{ error: string }>(),
	),
	DeleteAssessmentLegendIemTableSuccess: createAction(
		'[Assessment Legend Table] delete table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	DublicateAssessmentLegendIemTablePending: createAction(
		'[Assessment Legend Table] dublicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateAssessmentLegendIemTableError: createAction(
		'[Assessment Legend Table] dublicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateAssessmentLegendIemTableSuccess: createAction(
		'[Assessment Legend Table] dublicate table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	CreateAssessmentLegendIemTablePending: createAction(
		'[Assessment Legend Table] create table item pending',
		props<{ controller: string; item: any }>(),
	),
	CreateAssessmentLegendIemTableError: createAction(
		'[Assessment Legend Table] create table item error',
		props<{ controller: string; item: any }>(),
	),
	CreateAssessmentLegendIemTableSuccess: createAction(
		'[Assessment Legend Table] create table item success',
		props<{ controller: string; item: any }>(),
	),

	EditAssessmentLegendIemTablePending: createAction(
		'[Assessment Legend Table] edit table item pending',
		props<{ controller: string; item: any }>(),
	),
	EditAssessmentLegendIemTableError: createAction(
		'[Assessment Legend Table] edit table item error',
		props<{ controller: string; item: any }>(),
	),
	EditAssessmentLegendIemTableSuccess: createAction(
		'[Assessment Legend Table] edit table item success',
		props<{ controller: string; item: any }>(),
	),

	GetCurrentItemPending: createAction(
		'[Assessment Legend Table] get current item pending',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemSuccess: createAction(
		'[Assessment Legend Table] get current item success',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemError: createAction(
		'[Assessment Legend Table] get current item error',
		props<{ controller: string; id: string }>(),
	),
	ClearCurrentAssessmentLegend: createAction(
		'[Assessment Legend Table] Clear current AssessmentLegend',
	),
	ClearAssessmentLegendTable: createAction('[Assessment Legend Table] Clear'),
	GetTranslationPending: createAction(
		'[Assessment Legend Translated] get current item pending',
		props<{ legendId: string; languageId: string }>(),
	),
	GetTranslationSuccess: createAction(
		'[Assessment Legend Translated] get current item success',
		props<{ tranlsated: any }>(),
	),
	GetTranslationError: createAction('[Assessment Legend Translated] get current item error'),
	SetTranslationPending: createAction(
		'[Assessment Legend Translated] set current item pending',
		props<{ item: any; controller: string }>(),
	),
	SetTranslationSuccess: createAction('[Assessment Legend Translated] set current item success'),
	SetTranslationError: createAction('[Assessment Legend Translated] set current item error'),
	СlearTranslation: createAction('[Assessment Legend Translated] set current item error'),
	SaveGridSettingsPending: createAction(
		'[Assessment Legend Translated] save grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridSettingsSuccess: createAction(
		'[Assessment Legend Translated] save grid settings success',
	),
	SaveGridSettingsError: createAction('[Assessment Legend Translated] save grid settings error'),
	SaveGridChnagesPending: createAction(
		'[Assessment Legend Translated] save grid chnages pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridChnagesSuccess: createAction('[Assessment Legend Translated] save grid chnages success'),
	SaveGridChnagesError: createAction('[Assessment Legend Translated] save grid chnages error'),
	GetGridSettingsPending: createAction(
		'[Assessment Legend Translated] get grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	GetGridSettingsError: createAction('[Assessment Legend Translated] get grid settings error'),
	GetGridSettingsSuccess: createAction(
		'[Assessment Legend Translated] get grid settings success',
		props<{ gridSettings: IGridSettings }>(),
	),
	MakeDefaultGridPending: createAction(
		'[Assessment Legend Translated] make default grid pending',
		props<{ controller: string; id: string }>(),
	),
	MakeDefaultGridError: createAction('[Assessment Legend Translated] make default grid error'),
	MakeDefaultGridSuccess: createAction(
		'[Assessment Legend Translated] make default grid success',
		props<{ gridSettings: IGridSettings }>(),
	),
	RenameGridPending: createAction(
		'[Assessment Legend Translated] rename grid pending',
		props<{ controller: string; id: string }>(),
	),
	RenameGridError: createAction('[Assessment Legend Translated] rename grid error'),
	RenameGridSuccess: createAction(
		'[Assessment Legend Translated] rename grid success',
		props<{ gridSettings: IGridSettings }>(),
	),
};
