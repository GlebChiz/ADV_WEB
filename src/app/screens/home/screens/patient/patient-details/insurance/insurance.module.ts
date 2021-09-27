import { NgModule } from '@angular/core';
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
	GET_GRID_SETTINGS_ERROR,
	GET_GRID_SETTINGS_PENDING,
	GET_GRID_SETTINGS_SUCCESS,
	MAKE_DEFAULT_GRID_ERROR,
	MAKE_DEFAULT_GRID_PENDING,
	MAKE_DEFAULT_GRID_SUCCESS,
	RENAME_GRID_ERROR,
	RENAME_GRID_PENDING,
	RENAME_GRID_SUCCESS,
} from 'src/app/shared/table/table.tokens';
import { InsuranceCopyPopupComponent } from './insurance-table/copy-popup/copy-popup.component';
import { InsurancePopupComponent } from './insurance-table/insurance-popup/insurance-popup.component';
import { InsuranceTableActions } from './insurance-table/insurance-table.actions';
import { InsuranceTableComponent } from './insurance-table/insurance-table.component';
import { InsuranceTableEffect } from './insurance-table/insurance-table.effects';
import { insuranceReducers } from './insurance-table/insurance-table.reducers';
import { InsuranceService } from './insurance-table/insurance-table.service';
import { InsuranceComponent } from './insurance.component';

@NgModule({
	imports: [
		SharedModule,
		StoreModule.forFeature('insurance', insuranceReducers),
		EffectsModule.forFeature([InsuranceTableEffect]),
	],
	declarations: [
		InsuranceComponent,
		InsuranceCopyPopupComponent,
		InsuranceTableComponent,
		InsurancePopupComponent,
	],
	exports: [InsuranceComponent],
	entryComponents: [],
	providers: [
		InsuranceService,
		{
			provide: GET_TABLE_DATA_PENDING,
			useValue: InsuranceTableActions.GetInsuranceTableDataPending,
		},
		{
			provide: GET_TABLE_DATA_ERROR,
			useValue: InsuranceTableActions.GetInsuranceTableDataError,
		},
		{
			provide: GET_TABLE_DATA_SUCCESS,
			useValue: InsuranceTableActions.GetInsuranceTableDataSuccess,
		},
		{
			provide: UPDATE_TABLE_STATE,
			useValue: InsuranceTableActions.UpdateInsuranceTableState,
		},
		{
			provide: DELETE_ITEM_TABLE_ERROR,
			useValue: InsuranceTableActions.DeleteInsuranceIemTableError,
		},
		{
			provide: DELETE_ITEM_TABLE_SUCCESS,
			useValue: InsuranceTableActions.DeleteInsuranceIemTableSuccess,
		},
		{
			provide: DELETE_ITEM_TABLE_PENDING,
			useValue: InsuranceTableActions.DeleteInsuranceIemTablePending,
		},
		{
			provide: GET_CURRENT_ITEM_PENDING,
			useValue: InsuranceTableActions.GetCurrentItemPending,
		},
		{
			provide: GET_CURRENT_ITEM_ERROR,
			useValue: InsuranceTableActions.GetCurrentItemError,
		},
		{
			provide: GET_CURRENT_ITEM_SUCCESS,
			useValue: InsuranceTableActions.GetCurrentItemSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_PENDING,
			useValue: InsuranceTableActions.CreateInsuranceIemTablePending,
		},
		{
			provide: CREATE_ITEM_TABLE_SUCCESS,
			useValue: InsuranceTableActions.CreateInsuranceIemTableSuccess,
		},
		{
			provide: CREATE_ITEM_TABLE_ERROR,
			useValue: InsuranceTableActions.CreateInsuranceIemTableError,
		},
		{
			provide: EDIT_ITEM_TABLE_PENDING,
			useValue: InsuranceTableActions.EditInsuranceIemTablePending,
		},
		{
			provide: EDIT_ITEM_TABLE_SUCCESS,
			useValue: InsuranceTableActions.EditInsuranceIemTableSuccess,
		},
		{
			provide: EDIT_ITEM_TABLE_ERROR,
			useValue: InsuranceTableActions.EditInsuranceIemTableError,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_PENDING,
			useValue: InsuranceTableActions.DublicateInsuranceIemTablePending,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_SUCCESS,
			useValue: InsuranceTableActions.DublicateInsuranceIemTableSuccess,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_ERROR,
			useValue: InsuranceTableActions.DublicateInsuranceIemTableError,
		},
		{
			provide: CLEAR_CURRENT_ITEM,
			useValue: InsuranceTableActions.ClearCurrentInsurance,
		},
		{
			provide: SAVE_GRID_SETTINGS_PENDING,
			useValue: InsuranceTableActions.SaveGridSettingsPending,
		},
		{
			provide: SAVE_GRID_SETTINGS_ERROR,
			useValue: InsuranceTableActions.SaveGridSettingsError,
		},
		{
			provide: SAVE_GRID_SETTINGS_SUCCESS,
			useValue: InsuranceTableActions.SaveGridSettingsSuccess,
		},
		{
			provide: SAVE_GRID_CHANGES_PENDING,
			useValue: InsuranceTableActions.SaveGridChnagesPending,
		},
		{
			provide: SAVE_GRID_CHANGES_ERROR,
			useValue: InsuranceTableActions.SaveGridChnagesError,
		},
		{
			provide: SAVE_GRID_CHANGES_SUCCESS,
			useValue: InsuranceTableActions.SaveGridChnagesSuccess,
		},
		{
			provide: GET_GRID_SETTINGS_PENDING,
			useValue: InsuranceTableActions.GetGridSettingsPending,
		},
		{
			provide: GET_GRID_SETTINGS_ERROR,
			useValue: InsuranceTableActions.GetGridSettingsError,
		},
		{
			provide: GET_GRID_SETTINGS_SUCCESS,
			useValue: InsuranceTableActions.GetGridSettingsSuccess,
		},
		{
			provide: MAKE_DEFAULT_GRID_PENDING,
			useValue: InsuranceTableActions.MakeDefaultGridPending,
		},
		{
			provide: MAKE_DEFAULT_GRID_ERROR,
			useValue: InsuranceTableActions.MakeDefaultGridError,
		},
		{
			provide: MAKE_DEFAULT_GRID_SUCCESS,
			useValue: InsuranceTableActions.MakeDefaultGridSuccess,
		},
		{
			provide: RENAME_GRID_PENDING,
			useValue: InsuranceTableActions.RenameGridPending,
		},
		{
			provide: RENAME_GRID_ERROR,
			useValue: InsuranceTableActions.RenameGridError,
		},
		{
			provide: RENAME_GRID_SUCCESS,
			useValue: InsuranceTableActions.RenameGridSuccess,
		},
	],
})
export class InsuranceModule {}
