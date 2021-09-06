import { createAction, props } from '@ngrx/store';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
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
		'[Insurance Table] dublicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateInsuranceIemTableError: createAction(
		'[Insurance Table] dublicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateInsuranceIemTableSuccess: createAction(
		'[Insurance Table] dublicate table item success',
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
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemError: createAction(
		'[Insurance Table] get current item error',
		props<{ controller: string; id: string }>(),
	),
	ClearCurrentInsurance: createAction('[Insurance Table] Clear current Insurance'),

	ClearInsuranceTable: createAction('[Modality Table] Clear'),
	GetCurrentInsurancePending: createAction(
		'[Patient Table] Get current insurance pending',
		props<{ id: string }>(),
	),
	GetCurrentInsuranceSuccess: createAction(
		'[Patient Table] Get current insurance success',
		props<{ insurance: any }>(),
	),
	GetCurrentInsuranceError: createAction('[Patient Table] Get current insurance error'),
};
