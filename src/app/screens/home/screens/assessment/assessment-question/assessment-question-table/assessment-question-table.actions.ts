import { createAction, props } from '@ngrx/store';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { IGridSettings } from 'src/app/shared/interfaces/grid-settings.intarface';
import { IFilter } from 'src/app/shared/table/table.model';
import { IAssessmentQuestionTranslate } from './assessment-question-translate-popup/assessment-question-translate-popup.component';

export const AssessmentQuestionTableActions = {
	GetAssessmentQuestionTableDataPending: createAction(
		'[Assessment Question Table] get table data pending',
		props<{ controller: string; filter: IFilter; columns: IColumn[]; gridId: string }>(),
	),
	GetAssessmentQuestionTableDataSuccess: createAction(
		'[Assessment Question Table] get table data success',
		props<{ controller: string; filter: IFilter }>(),
	),
	GetAssessmentQuestionTableDataError: createAction(
		'[Assessment Question Table] get table data error',
		props<{ controller: string; filter: IFilter }>(),
	),
	UpdateAssessmentQuestionTableState: createAction(
		'[Assessment Question Table] Update',
		props<{ data: any }>(),
	),

	DeleteAssessmentQuestionIemTablePending: createAction(
		'[Assessment Question Table] delete table item pending',
		props<{
			controller: string;
			filter: IFilter;
			id: string;
			columns: IColumn[];
			gridId: string;
		}>(),
	),
	DeleteAssessmentQuestionIemTableError: createAction(
		'[Assessment Question Table] delete table item error',
		props<{ error: string }>(),
	),
	DeleteAssessmentQuestionIemTableSuccess: createAction(
		'[Assessment Question Table] delete table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	DublicateAssessmentQuestionIemTablePending: createAction(
		'[Assessment Question Table] dublicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateAssessmentQuestionIemTableError: createAction(
		'[Assessment Question Table] dublicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateAssessmentQuestionIemTableSuccess: createAction(
		'[Assessment Question Table] dublicate table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	CreateAssessmentQuestionIemTablePending: createAction(
		'[Assessment Question Table] create table item pending',
		props<{ controller: string; item: any }>(),
	),
	CreateAssessmentQuestionIemTableError: createAction(
		'[Assessment Question Table] create table item error',
		props<{ controller: string; item: any }>(),
	),
	CreateAssessmentQuestionIemTableSuccess: createAction(
		'[Assessment Question Table] create table item success',
		props<{ controller: string; item: any }>(),
	),

	EditAssessmentQuestionIemTablePending: createAction(
		'[Assessment Question Table] edit table item pending',
		props<{ controller: string; item: any }>(),
	),
	EditAssessmentQuestionIemTableError: createAction(
		'[Assessment Question Table] edit table item error',
		props<{ controller: string; item: any }>(),
	),
	EditAssessmentQuestionIemTableSuccess: createAction(
		'[Assessment Question Table] edit table item success',
		props<{ controller: string; item: any }>(),
	),

	GetCurrentItemPending: createAction(
		'[Assessment Question Table] get current item pending',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemSuccess: createAction(
		'[Assessment Question Table] get current item success',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemError: createAction(
		'[Assessment Question Table] get current item error',
		props<{ controller: string; id: string }>(),
	),
	ClearCurrentAssessmentQuestion: createAction(
		'[Assessment Question Table] Clear current AssessmentQuestion',
	),
	ClearAssessmentQuestionTable: createAction('[Assessment Question Table] Clear'),
	ReorderAssessmentQuestionPending: createAction(
		'[Assessment Question] Reorder current item pending',
		props<{ controller: string; questionId: string; assessmentId: string; index: number }>(),
	),
	ReorderAssessmentQuestionSuccess: createAction(
		'[Assessment Question] Reorder current item success',
	),
	ReorderAssessmentQuestionError: createAction('[Assessment Question] Reorder current item error'),
	GetCurrentTranslationAssessmentQuestionPending: createAction(
		'[Assessment Question] Get current translation pending',
		props<{ questionId: string; languageId: string }>(),
	),
	GetCurrentTranslationAssessmentQuestionSuccess: createAction(
		'[Assessment Question] Get current translation success',
		props<{ currentTranslation: any }>(),
	),
	GetCurrentTranslationAssessmentQuestionError: createAction(
		'[Assessment Question] Get current translation error',
	),
	UpdateCurrentTranslationAssessmentQuestionPending: createAction(
		'[Assessment Question] Update current translation pending',
		props<{
			questionId: string;
			languageId: string;
			currentTranslation: IAssessmentQuestionTranslate;
			controller: string;
		}>(),
	),
	UpdateCurrentTranslationAssessmentQuestionSuccess: createAction(
		'[Assessment Question] Update current translation success',
	),
	UpdateCurrentTranslationAssessmentQuestionError: createAction(
		'[Assessment Question] Update current translation error',
	),
	SaveGridSettingsPending: createAction(
		'[Assessment Question] save grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridSettingsSuccess: createAction('[Assessment Question] save grid settings success'),
	SaveGridSettingsError: createAction('[Assessment Question] save grid settings error'),
	SaveGridChnagesPending: createAction(
		'[Assessment Question] save grid chnages pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridChnagesSuccess: createAction('[Assessment Question] save grid chnages success'),
	SaveGridChnagesError: createAction('[Assessment Question] save grid chnages error'),
	GetGridSettingsPending: createAction(
		'[Assessment Question] get grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	GetGridSettingsError: createAction('[Assessment Question] get grid settings error'),
	GetGridSettingsSuccess: createAction(
		'[Assessment Question] get grid settings success',
		props<{ gridSettings: IGridSettings }>(),
	),
	MakeDefaultGridPending: createAction(
		'[Assessment Question] make default grid pending',
		props<{ controller: string; id: string }>(),
	),
	MakeDefaultGridError: createAction('[Assessment Question] make default grid error'),
	MakeDefaultGridSuccess: createAction(
		'[Assessment Question] make default grid success',
		props<{ gridSettings: IGridSettings }>(),
	),
	RenameGridPending: createAction(
		'[Assessment Question] rename grid pending',
		props<{ controller: string; id: string }>(),
	),
	RenameGridError: createAction('[Assessment Question] rename grid error'),
	RenameGridSuccess: createAction(
		'[Assessment Question] rename grid success',
		props<{ gridSettings: IGridSettings }>(),
	),
};
