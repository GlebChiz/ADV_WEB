import { createAction, props } from '@ngrx/store';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { IFilter } from 'src/app/shared/table/table.model';

export const PayerTableActions = {
	GetPayerTableDataPending: createAction(
		'[Payer Table] get table data pending',
		props<{ controller: string; filter: IFilter; columns: IColumn[]; gridId: string }>(),
	),

	GetPayerTableDataSuccess: createAction(
		'[Payer Table] get table data success',
		props<{ controller: string; filter: IFilter }>(),
	),

	GetPayerTableDataError: createAction(
		'[Payer Table] get table data error',
		props<{ controller: string; filter: IFilter }>(),
	),

	UpdatePayerTableState: createAction('[Payer Table] Update', props<{ data: any }>()),

	DeletePayerIemTablePending: createAction(
		'[Payer Table] delete table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DeletePayerIemTableError: createAction(
		'[Payer Table] delete table item error',
		props<{ error: string }>(),
	),
	DeletePayerIemTableSuccess: createAction(
		'[Payer Table] delete table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	DublicatePayerIemTablePending: createAction(
		'[Payer Table] dublicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicatePayerIemTableSuccess: createAction(
		'[Payer Table] dublicate table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicatePayerIemTableError: createAction(
		'[Payer Table] dublicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	CreatePayerIemTablePending: createAction(
		'[Payer Table] create table item pending',
		props<{ controller: string; item: any }>(),
	),
	CreatePayerIemTableSuccess: createAction(
		'[Payer Table] create table item success',
		props<{ controller: string; item: any }>(),
	),
	CreatePayerIemTableError: createAction(
		'[Payer Table] create table item error',
		props<{ controller: string; item: any }>(),
	),

	EditPayerIemTablePending: createAction(
		'[Payer Table] edit table item pending',
		props<{ controller: string; item: any }>(),
	),
	EditPayerIemTableSuccess: createAction(
		'[Payer Table] edit table item success',
		props<{ controller: string; item: any }>(),
	),
	EditPayerIemTableError: createAction(
		'[Payer Table] edit table item error',
		props<{ controller: string; item: any }>(),
	),

	GetCurrentItemPending: createAction(
		'[Payer Table] get current item pending',
		props<{ controller: string; id: string }>(),
	),

	GetCurrentItemSuccess: createAction(
		'[Payer Table] get current item success',
		props<{ controller: string; id: string }>(),
	),

	GetCurrentItemError: createAction(
		'[Payer Table] get current item error',
		props<{ controller: string; id: string }>(),
	),

	ClearCurrentPayer: createAction('[Payer Table] Clear current payer'),

	ClearPayerTable: createAction('[Payer Table] Clear'),
	SaveGridSettingsPending: createAction(
		'[Payer Table] save grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridSettingsSuccess: createAction('[Payer Table] save grid settings success'),
	SaveGridSettingsError: createAction('[Payer Table] save grid settings error'),
	SaveGridChnagesPending: createAction(
		'[Payer Table] save grid chnages pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridChnagesSuccess: createAction('[Payer Table] save grid chnages success'),
	SaveGridChnagesError: createAction('[Payer Table] save grid chnages error'),
	GetGridSettingsPending: createAction(
		'[Payer Table] get grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	GetGridSettingsError: createAction('[Payer Table] get grid settings error'),
	GetGridSettingsSuccess: createAction('[Payer Table] get grid settings success'),
};
