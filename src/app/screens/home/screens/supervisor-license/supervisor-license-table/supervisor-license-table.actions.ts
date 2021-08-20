import { createAction, props } from '@ngrx/store';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { IFilter } from 'src/app/shared/table/table.model';

export const SupervisorLicenseTableActions = {
	GetSupervisorLicenseTableDataPending: createAction(
		'[Supervisor License Table] get table data pending',
		props<{ controller: string; filter: IFilter; columns: IColumn[]; gridId: string }>(),
	),
	GetSupervisorLicenseTableDataSuccess: createAction(
		'[Supervisor License Table] get table data success',
		props<{ controller: string; filter: IFilter }>(),
	),
	GetSupervisorLicenseTableDataError: createAction(
		'[Supervisor License Table] get table data error',
		props<{ controller: string; filter: IFilter }>(),
	),
	UpdateSupervisorLicenseTableState: createAction(
		'[Supervisor License Table] Update',
		props<{ data: any }>(),
	),

	DeleteSupervisorLicenseIemTablePending: createAction(
		'[Supervisor License Table] delete table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DeleteSupervisorLicenseIemTableError: createAction(
		'[Supervisor License Table] delete table item error',
		props<{ error: string }>(),
	),
	DeleteSupervisorLicenseIemTableSuccess: createAction(
		'[Supervisor License Table] delete table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	DublicateSupervisorLicenseIemTablePending: createAction(
		'[Supervisor License Table] dublicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateSupervisorLicenseIemTableError: createAction(
		'[Supervisor License Table] dublicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateSupervisorLicenseIemTableSuccess: createAction(
		'[Supervisor License Table] dublicate table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	CreateSupervisorLicenseIemTablePending: createAction(
		'[Supervisor License Table] create table item pending',
		props<{ controller: string; item: any }>(),
	),
	CreateSupervisorLicenseIemTableError: createAction(
		'[Supervisor License Table] create table item error',
		props<{ controller: string; item: any }>(),
	),
	CreateSupervisorLicenseIemTableSuccess: createAction(
		'[Supervisor License Table] create table item success',
		props<{ controller: string; item: any }>(),
	),

	EditSupervisorLicenseIemTablePending: createAction(
		'[Supervisor License Table] edit table item pending',
		props<{ controller: string; item: any }>(),
	),
	EditSupervisorLicenseIemTableError: createAction(
		'[Supervisor License Table] edit table item error',
		props<{ controller: string; item: any }>(),
	),
	EditSupervisorLicenseIemTableSuccess: createAction(
		'[Supervisor License Table] edit table item success',
		props<{ controller: string; item: any }>(),
	),

	GetCurrentItemPending: createAction(
		'[Supervisor License Table] get current item pending',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemSuccess: createAction(
		'[Supervisor License Table] get current item success',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemError: createAction(
		'[Supervisor License Table] get current item error',
		props<{ controller: string; id: string }>(),
	),
	ClearCurrentSupervisorLicense: createAction(
		'[Supervisor License Table] Clear current SupervisorLicense',
	),

	ClearSupervisorLicenseTable: createAction('[Supervisor License Table] Clear'),
};
