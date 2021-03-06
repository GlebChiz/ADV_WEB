import { createAction, props } from '@ngrx/store';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { IFilter } from 'src/app/shared/table/table.model';

export const AssessmentTableActions = {
	GetAssessmentTableDataPending: createAction(
		'[Assessment Table] get table data pending',
		props<{ controller: string; filter: IFilter; columns: IColumn[]; gridId: string }>(),
	),
	GetAssessmentTableDataSuccess: createAction(
		'[Assessment Table] get table data success',
		props<{ controller: string; filter: IFilter }>(),
	),
	GetAssessmentTableDataError: createAction(
		'[Assessment Table] get table data error',
		props<{ controller: string; filter: IFilter }>(),
	),
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
		'[Assessment Table] dublicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateAssessmentIemTableError: createAction(
		'[Assessment Table] dublicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateAssessmentIemTableSuccess: createAction(
		'[Assessment Table] dublicate table item success',
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
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemError: createAction(
		'[Assessment Table] get current item error',
		props<{ controller: string; id: string }>(),
	),
	ClearCurrentAssessment: createAction('[Assessment Table] Clear current Assessment'),
	ClearAssessmentTable: createAction('[Assessment Table] Clear'),
};
