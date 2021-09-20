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
	SAVE_GRID_SETTINGS_PENDING,
	SAVE_GRID_SETTINGS_ERROR,
	SAVE_GRID_SETTINGS_SUCCESS,
	SAVE_GRID_CHANGES_ERROR,
	SAVE_GRID_CHANGES_PENDING,
	SAVE_GRID_CHANGES_SUCCESS,
} from 'src/app/shared/table/table.tokens';
import { UnsupervisedServicesTableActions } from './unsupervised-services-table/unsupervised-services-table.actions';
import { UnsupervisedServicesTableComponent } from './unsupervised-services-table/unsupervised-services-table.component';
import { SomeEffect } from './unsupervised-services-table/unsupervised-services-table.effects';
import { unsupervisedServicesReducers } from './unsupervised-services-table/unsupervised-services-table.reducers';
import { UnsupervisedServicesComponent } from './unsupervised-services.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: UnsupervisedServicesComponent,
			},
		]),
		StoreModule.forFeature('vunsupervisedservice', unsupervisedServicesReducers),
		EffectsModule.forFeature([SomeEffect]),
	],
	declarations: [UnsupervisedServicesComponent, UnsupervisedServicesTableComponent],
	entryComponents: [],
	providers: [
		{
			provide: GET_TABLE_DATA_PENDING,
			useValue: UnsupervisedServicesTableActions.GetUnsupervisedServicesTableDataPending,
		},
		{
			provide: GET_TABLE_DATA_ERROR,
			useValue: UnsupervisedServicesTableActions.GetUnsupervisedServicesTableDataError,
		},
		{
			provide: GET_TABLE_DATA_SUCCESS,
			useValue: UnsupervisedServicesTableActions.GetUnsupervisedServicesTableDataSuccess,
		},
		{
			provide: UPDATE_TABLE_STATE,
			useValue: UnsupervisedServicesTableActions.UpdateUnsupervisedServicesTableState,
		},
		{
			provide: DELETE_ITEM_TABLE_ERROR,
			useValue: UnsupervisedServicesTableActions.DeleteUnsupervisedServicesIemTableError,
		},
		{
			provide: DELETE_ITEM_TABLE_SUCCESS,
			useValue: UnsupervisedServicesTableActions.DeleteUnsupervisedServicesIemTableSuccess,
		},
		{
			provide: DELETE_ITEM_TABLE_PENDING,
			useValue: UnsupervisedServicesTableActions.DeleteUnsupervisedServicesIemTablePending,
		},
		{
			provide: GET_CURRENT_ITEM_PENDING,
			useValue: UnsupervisedServicesTableActions.GetCurrentItemPending,
		},
		{
			provide: GET_CURRENT_ITEM_ERROR,
			useValue: UnsupervisedServicesTableActions.GetCurrentItemError,
		},
		{
			provide: GET_CURRENT_ITEM_SUCCESS,
			useValue: UnsupervisedServicesTableActions.GetCurrentItemSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_PENDING,
			useValue: UnsupervisedServicesTableActions.CreateUnsupervisedServicesIemTablePending,
		},
		{
			provide: CREATE_ITEM_TABLE_SUCCESS,
			useValue: UnsupervisedServicesTableActions.CreateUnsupervisedServicesIemTableSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_ERROR,
			useValue: UnsupervisedServicesTableActions.CreateUnsupervisedServicesIemTableError,
		},
		{
			provide: EDIT_ITEM_TABLE_PENDING,
			useValue: UnsupervisedServicesTableActions.EditUnsupervisedServicesIemTablePending,
		},
		{
			provide: EDIT_ITEM_TABLE_SUCCESS,
			useValue: UnsupervisedServicesTableActions.EditUnsupervisedServicesIemTableSuccess,
		},
		{
			provide: EDIT_ITEM_TABLE_ERROR,
			useValue: UnsupervisedServicesTableActions.EditUnsupervisedServicesIemTableError,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_PENDING,
			useValue: UnsupervisedServicesTableActions.DublicateUnsupervisedServicesIemTablePending,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_SUCCESS,
			useValue: UnsupervisedServicesTableActions.DublicateUnsupervisedServicesIemTableSuccess,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_ERROR,
			useValue: UnsupervisedServicesTableActions.DublicateUnsupervisedServicesIemTableError,
		},
		{
			provide: CLEAR_CURRENT_ITEM,
			useValue: UnsupervisedServicesTableActions.ClearCurrentUnsupervisedServices,
		},
		{
			provide: SAVE_GRID_SETTINGS_PENDING,
			useValue: UnsupervisedServicesTableActions.SaveGridSettingsPending,
		},
		{
			provide: SAVE_GRID_SETTINGS_ERROR,
			useValue: UnsupervisedServicesTableActions.SaveGridSettingsError,
		},
		{
			provide: SAVE_GRID_SETTINGS_SUCCESS,
			useValue: UnsupervisedServicesTableActions.SaveGridSettingsSuccess,
		},
		{
			provide: SAVE_GRID_CHANGES_PENDING,
			useValue: UnsupervisedServicesTableActions.SaveGridChnagesPending,
		},
		{
			provide: SAVE_GRID_CHANGES_ERROR,
			useValue: UnsupervisedServicesTableActions.SaveGridChnagesError,
		},
		{
			provide: SAVE_GRID_CHANGES_SUCCESS,
			useValue: UnsupervisedServicesTableActions.SaveGridChnagesSuccess,
		},
	],
})
export class UnsupervisedServicesModule {}
