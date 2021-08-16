import { createAction, props } from '@ngrx/store';
import { IFilter } from 'src/app/shared/table/table.model';

export const AssessmentTableActions = {
	GetAssessmentTableDataPending: createAction(
		'[Session Plan Table] get table data pending',
		props<{ controller: string; filter: IFilter }>(),
	),
	GetAssessmentTableDataSuccess: createAction(
		'[Session Plan Table] get table data success',
		props<{ controller: string; filter: IFilter }>(),
	),
	GetAssessmentTableDataError: createAction(
		'[Session Plan Table] get table data error',
		props<{ controller: string; filter: IFilter }>(),
	),
	UpdateAssessmentTableState: createAction('[Session Plan Table] Update', props<{ data: any }>()),

	DeleteAssessmentIemTablePending: createAction(
		'[Session Plan Table] delete table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DeleteAssessmentIemTableError: createAction(
		'[Session Plan Table] delete table item error',
		props<{ error: string }>(),
	),
	DeleteAssessmentIemTableSuccess: createAction(
		'[Session Plan Table] delete table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	DublicateAssessmentIemTablePending: createAction(
		'[Session Plan Table] dublicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateAssessmentIemTableError: createAction(
		'[Session Plan Table] dublicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateAssessmentIemTableSuccess: createAction(
		'[Session Plan Table] dublicate table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	CreateAssessmentIemTablePending: createAction(
		'[Session Plan Table] create table item pending',
		props<{ controller: string; item: any }>(),
	),
	CreateAssessmentIemTableError: createAction(
		'[Session Plan Table] create table item error',
		props<{ controller: string; item: any }>(),
	),
	CreateAssessmentIemTableSuccess: createAction(
		'[Session Plan Table] create table item success',
		props<{ controller: string; item: any }>(),
	),

	EditAssessmentIemTablePending: createAction(
		'[Session Plan Table] edit table item pending',
		props<{ controller: string; item: any }>(),
	),
	EditAssessmentIemTableError: createAction(
		'[Session Plan Table] edit table item error',
		props<{ controller: string; item: any }>(),
	),
	EditAssessmentIemTableSuccess: createAction(
		'[Session Plan Table] edit table item success',
		props<{ controller: string; item: any }>(),
	),

	GetCurrentItemPending: createAction(
		'[Session Plan Table] get current item pending',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemSuccess: createAction(
		'[Session Plan Table] get current item success',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemError: createAction(
		'[Session Plan Table] get current item error',
		props<{ controller: string; id: string }>(),
	),
	ClearCurrentAssessment: createAction('[Session Plan Table] Clear current Assessment'),

	ClearAssessmentTable: createAction('[Session Plan Table] Clear'),
};
