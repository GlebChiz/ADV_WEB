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
	SAVE_GRID_CHANGES_ERROR,
	SAVE_GRID_CHANGES_PENDING,
	SAVE_GRID_CHANGES_SUCCESS,
	GET_GRID_SETTINGS_ERROR,
	GET_GRID_SETTINGS_PENDING,
	GET_GRID_SETTINGS_SUCCESS,
	SAVE_GRID_SETTINGS_SUCCESS,
	MAKE_DEFAULT_GRID_ERROR,
	MAKE_DEFAULT_GRID_PENDING,
	MAKE_DEFAULT_GRID_SUCCESS,
	RENAME_GRID_ERROR,
	RENAME_GRID_PENDING,
	RENAME_GRID_SUCCESS,
} from 'src/app/shared/table/table.tokens';
import { ClinicianPopupComponent } from './clinician-table/clinician-popup/clinician-popup.component';
import { ClinicianTableActions } from './clinician-table/clinician-table.actions';
import { ClinicianTableComponent } from './clinician-table/clinician-table.component';
import { ClinicianEffect } from './clinician-table/clinician-table.effects';
import { clinicianReducers } from './clinician-table/clinician-table.reducers';
import { ClinicianService } from './clinician-table/clinician-table.service';
import { ClinicianComponent } from './clinician.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: ClinicianComponent,
			},
			{
				path: ':id',
				loadChildren: (): any =>
					import('./clinician-details/clinician-details.module').then(
						(m: any) => m.ClinicianDetailsModule,
					),
				data: {
					breadcrumb: 'Single',
				},
			},
		]),
		StoreModule.forFeature('clinician', clinicianReducers),
		EffectsModule.forFeature([ClinicianEffect]),
	],
	declarations: [ClinicianComponent, ClinicianTableComponent, ClinicianPopupComponent],
	entryComponents: [],
	providers: [
		ClinicianService,
		{
			provide: GET_TABLE_DATA_PENDING,
			useValue: ClinicianTableActions.GetClinicianTableDataPending,
		},
		{
			provide: GET_TABLE_DATA_ERROR,
			useValue: ClinicianTableActions.GetClinicianTableDataError,
		},
		{
			provide: GET_TABLE_DATA_SUCCESS,
			useValue: ClinicianTableActions.GetClinicianTableDataSuccess,
		},
		{
			provide: UPDATE_TABLE_STATE,
			useValue: ClinicianTableActions.UpdateClinicianTableState,
		},
		{
			provide: DELETE_ITEM_TABLE_ERROR,
			useValue: ClinicianTableActions.DeleteClinicianIemTableError,
		},
		{
			provide: DELETE_ITEM_TABLE_SUCCESS,
			useValue: ClinicianTableActions.DeleteClinicianIemTableSuccess,
		},
		{
			provide: DELETE_ITEM_TABLE_PENDING,
			useValue: ClinicianTableActions.DeleteClinicianIemTablePending,
		},
		{
			provide: GET_CURRENT_ITEM_PENDING,
			useValue: ClinicianTableActions.GetCurrentItemPending,
		},
		{
			provide: GET_CURRENT_ITEM_ERROR,
			useValue: ClinicianTableActions.GetCurrentItemError,
		},
		{
			provide: GET_CURRENT_ITEM_SUCCESS,
			useValue: ClinicianTableActions.GetCurrentItemSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_PENDING,
			useValue: ClinicianTableActions.CreateClinicianIemTablePending,
		},
		{
			provide: CREATE_ITEM_TABLE_SUCCESS,
			useValue: ClinicianTableActions.CreateClinicianIemTableSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_ERROR,
			useValue: ClinicianTableActions.CreateClinicianIemTableError,
		},
		{
			provide: EDIT_ITEM_TABLE_PENDING,
			useValue: ClinicianTableActions.EditClinicianIemTablePending,
		},
		{
			provide: EDIT_ITEM_TABLE_SUCCESS,
			useValue: ClinicianTableActions.EditClinicianIemTableSuccess,
		},
		{
			provide: EDIT_ITEM_TABLE_ERROR,
			useValue: ClinicianTableActions.EditClinicianIemTableError,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_PENDING,
			useValue: ClinicianTableActions.DublicateClinicianIemTablePending,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_SUCCESS,
			useValue: ClinicianTableActions.DublicateClinicianIemTableSuccess,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_ERROR,
			useValue: ClinicianTableActions.DublicateClinicianIemTableError,
		},
		{
			provide: CLEAR_CURRENT_ITEM,
			useValue: ClinicianTableActions.ClearClinicianTable,
		},
		{
			provide: SAVE_GRID_SETTINGS_PENDING,
			useValue: ClinicianTableActions.SaveGridSettingsPending,
		},
		{
			provide: SAVE_GRID_SETTINGS_ERROR,
			useValue: ClinicianTableActions.SaveGridSettingsError,
		},
		{
			provide: SAVE_GRID_SETTINGS_SUCCESS,
			useValue: ClinicianTableActions.SaveGridSettingsSuccess,
		},
		{
			provide: SAVE_GRID_CHANGES_PENDING,
			useValue: ClinicianTableActions.SaveGridChnagesPending,
		},
		{
			provide: SAVE_GRID_CHANGES_ERROR,
			useValue: ClinicianTableActions.SaveGridChnagesError,
		},
		{
			provide: SAVE_GRID_CHANGES_SUCCESS,
			useValue: ClinicianTableActions.SaveGridChnagesSuccess,
		},
		{
			provide: GET_GRID_SETTINGS_PENDING,
			useValue: ClinicianTableActions.GetGridSettingsPending,
		},
		{
			provide: GET_GRID_SETTINGS_ERROR,
			useValue: ClinicianTableActions.GetGridSettingsError,
		},
		{
			provide: GET_GRID_SETTINGS_SUCCESS,
			useValue: ClinicianTableActions.GetGridSettingsSuccess,
		},
		{
			provide: MAKE_DEFAULT_GRID_PENDING,
			useValue: ClinicianTableActions.MakeDefaultGridPending,
		},
		{
			provide: MAKE_DEFAULT_GRID_ERROR,
			useValue: ClinicianTableActions.MakeDefaultGridError,
		},
		{
			provide: MAKE_DEFAULT_GRID_SUCCESS,
			useValue: ClinicianTableActions.MakeDefaultGridSuccess,
		},
		{
			provide: RENAME_GRID_PENDING,
			useValue: ClinicianTableActions.RenameGridPending,
		},
		{
			provide: RENAME_GRID_ERROR,
			useValue: ClinicianTableActions.RenameGridError,
		},
		{
			provide: RENAME_GRID_SUCCESS,
			useValue: ClinicianTableActions.RenameGridSuccess,
		},
	],
})
export class ClinicianModule {}
