import { createAction, props } from '@ngrx/store';
import { IFilter } from 'src/app/shared/table/table.model';

export const AssessmentTemplateTableActions = {
	GetAssessmentTemplateTableDataPending: createAction(
		'[Assessment Template Table] get table data pending',
		props<{ controller: string; filter: IFilter }>(),
	),
	GetAssessmentTemplateTableDataSuccess: createAction(
		'[Assessment Template Table] get table data success',
		props<{ controller: string; filter: IFilter }>(),
	),
	GetAssessmentTemplateTableDataError: createAction(
		'[Assessment Template Table] get table data error',
		props<{ controller: string; filter: IFilter }>(),
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
		'[Assessment Template Table] dublicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateAssessmentTemplateIemTableError: createAction(
		'[Assessment Template Table] dublicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateAssessmentTemplateIemTableSuccess: createAction(
		'[Assessment Template Table] dublicate table item success',
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
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemError: createAction(
		'[Assessment Template Table] get current item error',
		props<{ controller: string; id: string }>(),
	),
	ClearCurrentAssessmentTemplate: createAction(
		'[Assessment Template Table] Clear current AssessmentTemplate',
	),

	ClearAssessmentTemplateTable: createAction('[Assessment Template Table] Clear'),
};
