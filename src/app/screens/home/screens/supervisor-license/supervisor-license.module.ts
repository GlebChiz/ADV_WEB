import { SupervisorLicensePopupComponent } from './supervisor-license-table/supervisor-license-popup/supervisor-license-popup.component';
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
import { SupervisorLicenseComponent } from './supervisor-license.component';
import { SupervisorLicenseTableComponent } from './supervisor-license-table/supervisor-license-table.component';
import { SomeEffect } from './supervisor-license-table/supervisor-license-table.effects';
import { SupervisorLicenseTableActions } from './supervisor-license-table/supervisor-license-table.actions';
import { supervisorLicenseTableReducers } from './supervisor-license-table/supervisor-license-table.reducers';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: SupervisorLicenseComponent,
			},
		]),
		StoreModule.forFeature('supervisorLicenseTable', supervisorLicenseTableReducers),
		EffectsModule.forFeature([SomeEffect]),
	],
	declarations: [
		SupervisorLicenseComponent,
		SupervisorLicenseTableComponent,
		SupervisorLicensePopupComponent,
	],
	entryComponents: [],
	providers: [
		{
			provide: GET_TABLE_DATA_PENDING,
			useValue: SupervisorLicenseTableActions.GetSupervisorLicenseTableDataPending,
		},
		{
			provide: GET_TABLE_DATA_ERROR,
			useValue: SupervisorLicenseTableActions.GetSupervisorLicenseTableDataError,
		},
		{
			provide: GET_TABLE_DATA_SUCCESS,
			useValue: SupervisorLicenseTableActions.GetSupervisorLicenseTableDataSuccess,
		},
		{
			provide: UPDATE_TABLE_STATE,
			useValue: SupervisorLicenseTableActions.UpdateSupervisorLicenseTableState,
		},
		{
			provide: DELETE_ITEM_TABLE_ERROR,
			useValue: SupervisorLicenseTableActions.DeleteSupervisorLicenseIemTableError,
		},
		{
			provide: DELETE_ITEM_TABLE_SUCCESS,
			useValue: SupervisorLicenseTableActions.DeleteSupervisorLicenseIemTableSuccess,
		},
		{
			provide: DELETE_ITEM_TABLE_PENDING,
			useValue: SupervisorLicenseTableActions.DeleteSupervisorLicenseIemTablePending,
		},
		{
			provide: GET_CURRENT_ITEM_PENDING,
			useValue: SupervisorLicenseTableActions.GetCurrentItemPending,
		},
		{
			provide: GET_CURRENT_ITEM_ERROR,
			useValue: SupervisorLicenseTableActions.GetCurrentItemError,
		},
		{
			provide: GET_CURRENT_ITEM_SUCCESS,
			useValue: SupervisorLicenseTableActions.GetCurrentItemSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_PENDING,
			useValue: SupervisorLicenseTableActions.CreateSupervisorLicenseIemTablePending,
		},
		{
			provide: CREATE_ITEM_TABLE_SUCCESS,
			useValue: SupervisorLicenseTableActions.CreateSupervisorLicenseIemTableSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_ERROR,
			useValue: SupervisorLicenseTableActions.CreateSupervisorLicenseIemTableError,
		},
		{
			provide: EDIT_ITEM_TABLE_PENDING,
			useValue: SupervisorLicenseTableActions.EditSupervisorLicenseIemTablePending,
		},
		{
			provide: EDIT_ITEM_TABLE_SUCCESS,
			useValue: SupervisorLicenseTableActions.EditSupervisorLicenseIemTableSuccess,
		},
		{
			provide: EDIT_ITEM_TABLE_ERROR,
			useValue: SupervisorLicenseTableActions.EditSupervisorLicenseIemTableError,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_PENDING,
			useValue: SupervisorLicenseTableActions.DublicateSupervisorLicenseIemTablePending,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_SUCCESS,
			useValue: SupervisorLicenseTableActions.DublicateSupervisorLicenseIemTableSuccess,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_ERROR,
			useValue: SupervisorLicenseTableActions.DublicateSupervisorLicenseIemTableError,
		},
		{
			provide: CLEAR_CURRENT_ITEM,
			useValue: SupervisorLicenseTableActions.ClearCurrentSupervisorLicense,
		},
	],
})
export class SupervisorLicenseModuleModule {}
