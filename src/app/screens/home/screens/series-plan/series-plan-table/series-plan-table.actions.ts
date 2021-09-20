import { createAction, props } from '@ngrx/store';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { IFilter } from 'src/app/shared/table/table.model';

export const SeriesplansTableActions = {
	GetSeriesplansTableDataPending: createAction(
		'[Seriesplans Table] get table data pending',
		props<{ controller: string; filter: IFilter; columns: IColumn[]; gridId: string }>(),
	),
	GetSeriesplansTableDataSuccess: createAction(
		'[Seriesplans Table] get table data success',
		props<{ controller: string; filter: IFilter }>(),
	),
	ClearCurrentSeriesplans: createAction(
		'[Seriesplans Table] get table data success',
		props<{ controller: string; filter: IFilter }>(),
	),

	GetSeriesplansTableDataError: createAction(
		'[Seriesplans Table] get table data error',
		props<{ controller: string; filter: IFilter }>(),
	),
	UpdateSeriesplansTableState: createAction('[Seriesplans Table] Update', props<{ data: any }>()),

	DeleteSeriesplansIemTablePending: createAction(
		'[Seriesplans Table] delete table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DeleteSeriesplansIemTableError: createAction(
		'[Seriesplans Table] delete table item error',
		props<{ error: string }>(),
	),
	DeleteSeriesplansIemTableSuccess: createAction(
		'[Seriesplans Table] delete table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	DublicateSeriesplansIemTablePending: createAction(
		'[Seriesplans Table] dublicate table item pending',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateSeriesplansIemTableError: createAction(
		'[Seriesplans Table] dublicate table item error',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),
	DublicateSeriesplansIemTableSuccess: createAction(
		'[Seriesplans Table] dublicate table item success',
		props<{ controller: string; filter: IFilter; id: string }>(),
	),

	CreateSeriesplansIemTablePending: createAction(
		'[Seriesplans Table] create table item pending',
		props<{ controller: string; item: any }>(),
	),
	CreateSeriesplansIemTableError: createAction(
		'[Seriesplans Table] create table item error',
		props<{ controller: string; item: any }>(),
	),
	CreateSeriesplansIemTableSuccess: createAction(
		'[Seriesplans Table] create table item success',
		props<{ controller: string; item: any }>(),
	),

	EditSeriesplansIemTablePending: createAction(
		'[Seriesplans Table] edit table item pending',
		props<{ controller: string; item: any }>(),
	),
	EditSeriesplansIemTableError: createAction(
		'[Seriesplans Table] edit table item error',
		props<{ controller: string; item: any }>(),
	),
	EditSeriesplansIemTableSuccess: createAction(
		'[Seriesplans Table] edit table item success',
		props<{ controller: string; item: any }>(),
	),

	GetCurrentItemPending: createAction(
		'[Seriesplans Table] get current item pending',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemSuccess: createAction(
		'[Seriesplans Table] get current item success',
		props<{ controller: string; id: string }>(),
	),
	GetCurrentItemError: createAction(
		'[Seriesplans Table] get current item error',
		props<{ controller: string; id: string }>(),
	),

	ClearSeriesplansTable: createAction('[Seriesplans Table] Clear'),
	ClearCurrentSeriesPlan: createAction('[Seriesplans Table] Clear current SessionPlan'),
	SaveGridSettingsPending: createAction(
		'[Seriesplans Table] save grid settings pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridSettingsSuccess: createAction('[Seriesplans Table] save grid settings success'),
	SaveGridSettingsError: createAction('[Seriesplans Table] save grid settings error'),
	SaveGridChnagesPending: createAction(
		'[Seriesplans Table] save grid chnages pending',
		props<{ controller: string; id: string }>(),
	),
	SaveGridChnagesSuccess: createAction('[Seriesplans Table] save grid chnages success'),
	SaveGridChnagesError: createAction('[Seriesplans Table] save grid chnages error'),
};
