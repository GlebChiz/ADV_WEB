import { createAction, props } from '@ngrx/store';
import { IFilter } from 'src/app/shared/table/table.model';

export const PatientDistributionTableActions = {
	GetPatientDistributionTableDataPending: createAction(
		'[Patient Distribution Table] get table data pending',
		props<{ controller: string; filter: IFilter }>(),
	),
	GetPatientDistributionTableDataSuccess: createAction(
		'[Patient Distribution Table] get table data success',
		props<{ controller: string; filter: IFilter }>(),
	),
	GetPatientDistributionTableDataError: createAction(
		'[Patient Distribution Table] get table data error',
		props<{ controller: string; filter: IFilter }>(),
	),
	UpdatePatientDistributionTableState: createAction(
		'[Patient Distribution Table] Update',
		props<{ data: any }>(),
	),

	DeletePatientDistributionIemTablePending: createAction(
		'[Patient Distribution Table] delete table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DeletePatientDistributionIemTableError: createAction(
		'[Patient Distribution Table] delete table item error',
		props<{ error: string }>(),
	),
	DeletePatientDistributionIemTableSuccess: createAction(
		'[Patient Distribution Table] delete table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	DublicatePatientDistributionIemTablePending: createAction(
		'[Patient Distribution Table] dublicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicatePatientDistributionIemTableError: createAction(
		'[Patient Distribution Table] dublicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicatePatientDistributionIemTableSuccess: createAction(
		'[Patient Distribution Table] dublicate table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	CreatePatientDistributionIemTablePending: createAction(
		'[Patient Distribution Table] create table item pending',
		props<{ controller: string; item: any }>(),
	),
	CreatePatientDistributionIemTableError: createAction(
		'[Patient Distribution Table] create table item error',
		props<{ controller: string; item: any }>(),
	),
	CreatePatientDistributionIemTableSuccess: createAction(
		'[Patient Distribution Table] create table item success',
		props<{ controller: string; item: any }>(),
	),

	EditPatientDistributionIemTablePending: createAction(
		'[Patient Distribution Table] edit table item pending',
		props<{ controller: string; item: any }>(),
	),
	EditPatientDistributionIemTableError: createAction(
		'[Patient Distribution Table] edit table item error',
		props<{ controller: string; item: any }>(),
	),
	EditPatientDistributionIemTableSuccess: createAction(
		'[Patient Distribution Table] edit table item success',
		props<{ controller: string; item: any }>(),
	),

	GetCurrentItemPending: createAction(
		'[Patient Distribution Table] get current item pending',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemSuccess: createAction(
		'[Patient Distribution Table] get current item success',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemError: createAction(
		'[Patient Distribution Table] get current item error',
		props<{ controller: string; id: string }>(),
	),
	ClearCurrentPatientDistribution: createAction(
		'[Patient Distribution Table] Clear current PatientDistribution',
	),

	ClearPatientDistributionTable: createAction('[Patient Distribution Table] Clear'),
};
