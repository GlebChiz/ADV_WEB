import { createAction, props } from '@ngrx/store';
import { IClinicianGeneralInfo } from 'src/app/shared/components/clinician-general-info/clinician-general-info.component';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { IFilter } from 'src/app/shared/table/table.model';

export const ClinicianTableActions = {
	GetClinicianTableDataPending: createAction(
		'[Clinician Table] get table data pending',
		props<{ controller: string; filter: IFilter; columns: IColumn[]; gridId: string }>(),
	),
	GetClinicianTableDataSuccess: createAction(
		'[Clinician Table] get table data success',
		props<{ controller: string; filter: IFilter }>(),
	),
	ClearCurrentClinician: createAction(
		'[Clinician Table] get table data success',
		props<{ controller: string; filter: IFilter }>(),
	),

	GetClinicianTableDataError: createAction(
		'[Clinician Table] get table data error',
		props<{ controller: string; filter: IFilter }>(),
	),
	UpdateClinicianTableState: createAction('[Clinician Table] Update', props<{ data: any }>()),

	DeleteClinicianIemTablePending: createAction(
		'[Clinician Table] delete table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DeleteClinicianIemTableError: createAction(
		'[Clinician Table] delete table item error',
		props<{ error: string }>(),
	),
	DeleteClinicianIemTableSuccess: createAction(
		'[Clinician Table] delete table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	DublicateClinicianIemTablePending: createAction(
		'[Clinician Table] dublicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateClinicianIemTableError: createAction(
		'[Clinician Table] dublicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateClinicianIemTableSuccess: createAction(
		'[Clinician Table] dublicate table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	CreateClinicianIemTablePending: createAction(
		'[Clinician Table] create table item pending',
		props<{ controller: string; item: any }>(),
	),
	CreateClinicianIemTableError: createAction(
		'[Clinician Table] create table item error',
		props<{ controller: string; item: any }>(),
	),
	CreateClinicianIemTableSuccess: createAction(
		'[Clinician Table] create table item success',
		props<{ controller: string; item: any }>(),
	),

	EditClinicianIemTablePending: createAction(
		'[Clinician Table] edit table item pending',
		props<{ controller: string; item: any }>(),
	),
	EditClinicianIemTableError: createAction(
		'[Clinician Table] edit table item error',
		props<{ controller: string; item: any }>(),
	),
	EditClinicianIemTableSuccess: createAction(
		'[Clinician Table] edit table item success',
		props<{ controller: string; item: any }>(),
	),

	GetCurrentItemPending: createAction(
		'[Clinician Table] get current item pending',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemSuccess: createAction(
		'[Clinician Table] get current item success',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemError: createAction(
		'[Clinician Table] get current item error',
		props<{ controller: string; id: string }>(),
	),

	ClearClinicianTable: createAction('[Clinician Table] Clear'),

	GetClinicianGeneralInfoPending: createAction(
		'[Clinician Table] Get Clinician general info pending',
		props<{ id: string }>(),
	),
	GetClinicianGeneralInfoSuccess: createAction(
		'[Clinician Table] Get Clinician general info success',
		props<{ clinicianInfo: IClinicianGeneralInfo }>(),
	),
	GetClinicianGeneralInfoError: createAction('[Clinician Table] Get Clinician general info error'),

	UpdateClinicianGeneralInfoPending: createAction(
		'[Clinician Table] Update Clinician general info pending',
		props<{ id: string; clinicianInfo: IClinicianGeneralInfo }>(),
	),
	UpdateClinicianGeneralInfoSuccess: createAction(
		'[Clinician Table] Update Clinician general info success',
	),
	UpdateClinicianGeneralInfoError: createAction(
		'[Clinician Table] Update Clinician general info error',
	),
};
