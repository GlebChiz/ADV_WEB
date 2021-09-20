import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import {
	CLEAR_CURRENT_ITEM,
	CREATE_ITEM_TABLE_ERROR,
	CREATE_ITEM_TABLE_PENDING,
	CREATE_ITEM_TABLE_SUCCESS,
	DELETE_ITEM_TABLE_ERROR,
	DELETE_ITEM_TABLE_PENDING,
	DELETE_ITEM_TABLE_SUCCESS,
	DUBLICATE_ITEM_TABLE_ERROR,
	DUBLICATE_ITEM_TABLE_PENDING,
	DUBLICATE_ITEM_TABLE_SUCCESS,
	EDIT_ITEM_TABLE_ERROR,
	EDIT_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_SUCCESS,
	GET_CURRENT_ITEM_ERROR,
	GET_CURRENT_ITEM_PENDING,
	GET_CURRENT_ITEM_SUCCESS,
	GET_GRID_SETTINGS_ERROR,
	GET_GRID_SETTINGS_PENDING,
	GET_GRID_SETTINGS_SUCCESS,
	GET_TABLE_DATA_ERROR,
	GET_TABLE_DATA_PENDING,
	GET_TABLE_DATA_SUCCESS,
	SAVE_GRID_CHANGES_ERROR,
	SAVE_GRID_CHANGES_PENDING,
	SAVE_GRID_CHANGES_SUCCESS,
	SAVE_GRID_SETTINGS_ERROR,
	SAVE_GRID_SETTINGS_PENDING,
	SAVE_GRID_SETTINGS_SUCCESS,
	UPDATE_TABLE_STATE,
} from 'src/app/shared/table/table.tokens';
import { SessionPlanTableActions } from '../../session-plan/session-plan-table/session-plan-table.actions';
import { SessionPlansEffects } from '../../session-plan/session-plan-table/session-plan-table.effects';
import { sessionPlanTableReducers } from '../../session-plan/session-plan-table/session-plan-table.reducers';
import { SessionPlanTableSerivce } from '../../session-plan/session-plan-table/session-plan-table.service';
import { SeriesPlanLinkedTableComponent } from '../series-plan-linked-table/series-plan-linked-table.component';

import { SeriesPlanDetailsComponent } from './series-plan-details.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: SeriesPlanDetailsComponent,
			},
		]),
		StoreModule.forFeature('sessionPlan', sessionPlanTableReducers),
		EffectsModule.forFeature([SessionPlansEffects]),
	],
	declarations: [SeriesPlanDetailsComponent, SeriesPlanLinkedTableComponent],
	entryComponents: [],
	providers: [
		SessionPlanTableSerivce,
		{
			provide: GET_TABLE_DATA_PENDING,
			useValue: SessionPlanTableActions.GetSessionPlanTableDataPending,
		},
		{
			provide: GET_TABLE_DATA_ERROR,
			useValue: SessionPlanTableActions.GetSessionPlanTableDataError,
		},
		{
			provide: GET_TABLE_DATA_SUCCESS,
			useValue: SessionPlanTableActions.GetSessionPlanTableDataSuccess,
		},
		{
			provide: UPDATE_TABLE_STATE,
			useValue: SessionPlanTableActions.UpdateSessionPlanTableState,
		},
		{
			provide: DELETE_ITEM_TABLE_ERROR,
			useValue: SessionPlanTableActions.DeleteSessionPlanIemTableError,
		},
		{
			provide: DELETE_ITEM_TABLE_SUCCESS,
			useValue: SessionPlanTableActions.DeleteSessionPlanIemTableSuccess,
		},
		{
			provide: DELETE_ITEM_TABLE_PENDING,
			useValue: SessionPlanTableActions.DeleteSessionPlanIemTablePending,
		},
		{
			provide: GET_CURRENT_ITEM_PENDING,
			useValue: SessionPlanTableActions.GetCurrentItemPending,
		},
		{
			provide: GET_CURRENT_ITEM_ERROR,
			useValue: SessionPlanTableActions.GetCurrentItemError,
		},
		{
			provide: GET_CURRENT_ITEM_SUCCESS,
			useValue: SessionPlanTableActions.GetCurrentItemSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_PENDING,
			useValue: SessionPlanTableActions.CreateSessionPlanIemTablePending,
		},
		{
			provide: CREATE_ITEM_TABLE_SUCCESS,
			useValue: SessionPlanTableActions.CreateSessionPlanIemTableSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_ERROR,
			useValue: SessionPlanTableActions.CreateSessionPlanIemTableError,
		},
		{
			provide: EDIT_ITEM_TABLE_PENDING,
			useValue: SessionPlanTableActions.EditSessionPlanIemTablePending,
		},
		{
			provide: EDIT_ITEM_TABLE_SUCCESS,
			useValue: SessionPlanTableActions.EditSessionPlanIemTableSuccess,
		},
		{
			provide: EDIT_ITEM_TABLE_ERROR,
			useValue: SessionPlanTableActions.EditSessionPlanIemTableError,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_PENDING,
			useValue: SessionPlanTableActions.DublicateSessionPlanIemTablePending,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_SUCCESS,
			useValue: SessionPlanTableActions.DublicateSessionPlanIemTableSuccess,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_ERROR,
			useValue: SessionPlanTableActions.DublicateSessionPlanIemTableError,
		},
		{
			provide: CLEAR_CURRENT_ITEM,
			useValue: SessionPlanTableActions.ClearCurrentSessionPlan,
		},
		{
			provide: SAVE_GRID_SETTINGS_PENDING,
			useValue: SessionPlanTableActions.SaveGridSettingsPending,
		},
		{
			provide: SAVE_GRID_SETTINGS_ERROR,
			useValue: SessionPlanTableActions.SaveGridSettingsError,
		},
		{
			provide: SAVE_GRID_SETTINGS_SUCCESS,
			useValue: SessionPlanTableActions.SaveGridSettingsSuccess,
		},
		{
			provide: SAVE_GRID_CHANGES_PENDING,
			useValue: SessionPlanTableActions.SaveGridChnagesPending,
		},
		{
			provide: SAVE_GRID_CHANGES_ERROR,
			useValue: SessionPlanTableActions.SaveGridChnagesError,
		},
		{
			provide: SAVE_GRID_CHANGES_SUCCESS,
			useValue: SessionPlanTableActions.SaveGridChnagesSuccess,
		},
		{
			provide: GET_GRID_SETTINGS_PENDING,
			useValue: SessionPlanTableActions.GetGridSettingsPending,
		},
		{
			provide: GET_GRID_SETTINGS_ERROR,
			useValue: SessionPlanTableActions.GetGridSettingsError,
		},
		{
			provide: GET_GRID_SETTINGS_SUCCESS,
			useValue: SessionPlanTableActions.GetGridSettingsSuccess,
		},
	],
})
export class SeriesPlanDetailsModule {}
