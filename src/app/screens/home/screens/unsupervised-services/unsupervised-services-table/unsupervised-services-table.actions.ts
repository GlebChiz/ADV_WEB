import { createAction, props } from '@ngrx/store';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { IFilter } from 'src/app/shared/table/table.model';

export const UnsupervisedServicesTableActions = {
	GetUnsupervisedServicesTableDataPending: createAction(
		'[Unsupervised Services Table] get table data pending',
		props<{ controller: string; filter: IFilter; columns: IColumn[]; gridId: string }>(),
	),
	GetUnsupervisedServicesTableDataSuccess: createAction(
		'[Unsupervised Services Table] get table data success',
		props<{ controller: string; filter: IFilter }>(),
	),
	GetUnsupervisedServicesTableDataError: createAction(
		'[Unsupervised Services Table] get table data error',
		props<{ controller: string; filter: IFilter }>(),
	),
	UpdateUnsupervisedServicesTableState: createAction(
		'[Unsupervised Services Table] Update',
		props<{ data: any }>(),
	),

	DeleteUnsupervisedServicesIemTablePending: createAction(
		'[Unsupervised Services Table] delete table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DeleteUnsupervisedServicesIemTableError: createAction(
		'[Unsupervised Services Table] delete table item error',
		props<{ error: string }>(),
	),
	DeleteUnsupervisedServicesIemTableSuccess: createAction(
		'[Unsupervised Services Table] delete table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	DublicateUnsupervisedServicesIemTablePending: createAction(
		'[Unsupervised Services Table] dublicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateUnsupervisedServicesIemTableError: createAction(
		'[Unsupervised Services Table] dublicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateUnsupervisedServicesIemTableSuccess: createAction(
		'[Unsupervised Services Table] dublicate table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	CreateUnsupervisedServicesIemTablePending: createAction(
		'[Unsupervised Services Table] create table item pending',
		props<{ controller: string; item: any }>(),
	),
	CreateUnsupervisedServicesIemTableError: createAction(
		'[Unsupervised Services Table] create table item error',
		props<{ controller: string; item: any }>(),
	),
	CreateUnsupervisedServicesIemTableSuccess: createAction(
		'[Unsupervised Services Table] create table item success',
		props<{ controller: string; item: any }>(),
	),

	EditUnsupervisedServicesIemTablePending: createAction(
		'[Unsupervised Services Table] edit table item pending',
		props<{ controller: string; item: any }>(),
	),
	EditUnsupervisedServicesIemTableError: createAction(
		'[Unsupervised Services Table] edit table item error',
		props<{ controller: string; item: any }>(),
	),
	EditUnsupervisedServicesIemTableSuccess: createAction(
		'[Unsupervised Services Table] edit table item success',
		props<{ controller: string; item: any }>(),
	),

	GetCurrentItemPending: createAction(
		'[Unsupervised Services Table] get current item pending',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemSuccess: createAction(
		'[Unsupervised Services Table] get current item success',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemError: createAction(
		'[Unsupervised Services Table] get current item error',
		props<{ controller: string; id: string }>(),
	),
	ClearCurrentUnsupervisedServices: createAction(
		'[Unsupervised Services Table] Clear current UnsupervisedServices',
	),

	ClearUnsupervisedServicesTable: createAction('[Unsupervised Services Table] Clear'),
};
