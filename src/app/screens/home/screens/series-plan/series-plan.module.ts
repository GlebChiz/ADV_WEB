import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';

import {
	GET_TABLE_DATA_PENDING,
	UPDATE_TABLE_STATE,
	DELETE_ITEM_TABLE_PENDING,
	CREATE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	DUBLICATE_ITEM_TABLE_PENDING,
	DELETE_ITEM_TABLE_ERROR,
	GET_CURRENT_ITEM_PENDING,
	GET_TABLE_DATA_ERROR,
	GET_TABLE_DATA_SUCCESS,
	DELETE_ITEM_TABLE_SUCCESS,
	GET_CURRENT_ITEM_ERROR,
	GET_CURRENT_ITEM_SUCCESS,
	CREATE_ITEM_TABLE_SUCCESS,
	CREATE_ITEM_TABLE_ERROR,
	EDIT_ITEM_TABLE_SUCCESS,
	EDIT_ITEM_TABLE_ERROR,
	DUBLICATE_ITEM_TABLE_SUCCESS,
	DUBLICATE_ITEM_TABLE_ERROR,
	CLEAR_CURRENT_ITEM,
} from 'src/app/shared/table/table.tokens';
import { SeriesPlanPopupComponent } from './series-plan-table/series-plan-popup/series-plan-popup.component';
import { SeriesplansTableActions } from './series-plan-table/series-plan-table.actions';
import { SeriesplansTableComponent } from './series-plan-table/series-plan-table.component';
import { SeriesPlansEffects } from './series-plan-table/series-plan-table.effects';
import { seriesplansTableReducers } from './series-plan-table/series-plan-table.reducers';
import { SeriesplansComponent } from './series-plan.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: SeriesplansComponent,
			},
		]),
		StoreModule.forFeature('seriesplanTable', seriesplansTableReducers),
		EffectsModule.forFeature([SeriesPlansEffects]),
	],
	declarations: [SeriesplansComponent, SeriesplansTableComponent, SeriesPlanPopupComponent],
	entryComponents: [],
	providers: [
		{
			provide: GET_TABLE_DATA_PENDING,
			useValue: SeriesplansTableActions.GetSeriesplansTableDataPending,
		},
		{
			provide: GET_TABLE_DATA_ERROR,
			useValue: SeriesplansTableActions.GetSeriesplansTableDataError,
		},
		{
			provide: GET_TABLE_DATA_SUCCESS,
			useValue: SeriesplansTableActions.GetSeriesplansTableDataSuccess,
		},
		{
			provide: UPDATE_TABLE_STATE,
			useValue: SeriesplansTableActions.UpdateSeriesplansTableState,
		},
		{
			provide: DELETE_ITEM_TABLE_ERROR,
			useValue: SeriesplansTableActions.DeleteSeriesplansIemTableError,
		},
		{
			provide: DELETE_ITEM_TABLE_SUCCESS,
			useValue: SeriesplansTableActions.DeleteSeriesplansIemTableSuccess,
		},
		{
			provide: DELETE_ITEM_TABLE_PENDING,
			useValue: SeriesplansTableActions.DeleteSeriesplansIemTablePending,
		},
		{
			provide: GET_CURRENT_ITEM_PENDING,
			useValue: SeriesplansTableActions.GetCurrentItemPending,
		},
		{
			provide: GET_CURRENT_ITEM_ERROR,
			useValue: SeriesplansTableActions.GetCurrentItemError,
		},
		{
			provide: GET_CURRENT_ITEM_SUCCESS,
			useValue: SeriesplansTableActions.GetCurrentItemSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_PENDING,
			useValue: SeriesplansTableActions.CreateSeriesplansIemTablePending,
		},
		{
			provide: CREATE_ITEM_TABLE_SUCCESS,
			useValue: SeriesplansTableActions.CreateSeriesplansIemTableSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_ERROR,
			useValue: SeriesplansTableActions.CreateSeriesplansIemTableError,
		},
		{
			provide: EDIT_ITEM_TABLE_PENDING,
			useValue: SeriesplansTableActions.EditSeriesplansIemTablePending,
		},
		{
			provide: EDIT_ITEM_TABLE_SUCCESS,
			useValue: SeriesplansTableActions.EditSeriesplansIemTableSuccess,
		},
		{
			provide: EDIT_ITEM_TABLE_ERROR,
			useValue: SeriesplansTableActions.EditSeriesplansIemTableError,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_PENDING,
			useValue: SeriesplansTableActions.DublicateSeriesplansIemTablePending,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_SUCCESS,
			useValue: SeriesplansTableActions.DublicateSeriesplansIemTableSuccess,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_ERROR,
			useValue: SeriesplansTableActions.DublicateSeriesplansIemTableError,
		},
		{
			provide: CLEAR_CURRENT_ITEM,
			useValue: SeriesplansTableActions.ClearCurrentSeriesPlan,
		},
	],
})
export class SeriesplansModule {}
