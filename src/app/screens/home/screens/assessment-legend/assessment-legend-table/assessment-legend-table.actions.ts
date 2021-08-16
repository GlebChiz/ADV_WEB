import { createAction, props } from '@ngrx/store';
import { IFilter } from 'src/app/shared/table/table.model';

export const AssessmentLegendTableActions = {
	GetAssessmentLegendTableDataPending: createAction(
		'[Assessment Legend Table] get table data pending',
		props<{ controller: string; filter: IFilter }>(),
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
};
