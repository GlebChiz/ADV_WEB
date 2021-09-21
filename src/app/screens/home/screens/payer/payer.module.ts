import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TableEffects } from 'src/app/shared/table/table.effect';
import {
	GET_TABLE_DATA_PENDING,
	UPDATE_TABLE_STATE,
	DELETE_ITEM_TABLE_PENDING,
	CREATE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	DUBLICATE_ITEM_TABLE_PENDING,
	DELETE_ITEM_TABLE_ERROR,
	GET_CURRENT_ITEM_PENDING,
	GET_TABLE_DATA_SUCCESS,
	GET_TABLE_DATA_ERROR,
	DELETE_ITEM_TABLE_SUCCESS,
	GET_CURRENT_ITEM_ERROR,
	GET_CURRENT_ITEM_SUCCESS,
	CREATE_ITEM_TABLE_ERROR,
	CREATE_ITEM_TABLE_SUCCESS,
	EDIT_ITEM_TABLE_ERROR,
	EDIT_ITEM_TABLE_SUCCESS,
	DUBLICATE_ITEM_TABLE_ERROR,
	DUBLICATE_ITEM_TABLE_SUCCESS,
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
} from 'src/app/shared/table/table.tokens';
import { SharedModule } from 'src/app/shared/shared.module';
import { PayerTableActions } from './payer-table/payer-table.actions';
import { PayerTableComponent } from './payer-table/payer-table.component';
import { payerReducers } from './payer-table/payer-table.reducers';
import { PayerPopupComponent } from './payer-table/payer-popup/payer-popup.component';
import { PayerComponent } from './payer.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: PayerComponent,
			},
		]),
		StoreModule.forFeature('payer', payerReducers),
		EffectsModule.forFeature([TableEffects]),
	],
	declarations: [PayerComponent, PayerTableComponent, PayerPopupComponent],
	entryComponents: [],
	providers: [
		{
			provide: GET_TABLE_DATA_PENDING,
			useValue: PayerTableActions.GetPayerTableDataPending,
		},
		{
			provide: GET_TABLE_DATA_SUCCESS,
			useValue: PayerTableActions.GetPayerTableDataSuccess,
		},
		{
			provide: GET_TABLE_DATA_ERROR,
			useValue: PayerTableActions.GetPayerTableDataError,
		},
		{
			provide: UPDATE_TABLE_STATE,
			useValue: PayerTableActions.UpdatePayerTableState,
		},
		{
			provide: DELETE_ITEM_TABLE_ERROR,
			useValue: PayerTableActions.DeletePayerIemTableError,
		},
		{
			provide: DELETE_ITEM_TABLE_PENDING,
			useValue: PayerTableActions.DeletePayerIemTablePending,
		},
		{
			provide: DELETE_ITEM_TABLE_SUCCESS,
			useValue: PayerTableActions.DeletePayerIemTableSuccess,
		},
		{
			provide: GET_CURRENT_ITEM_PENDING,
			useValue: PayerTableActions.GetCurrentItemPending,
		},
		{
			provide: GET_CURRENT_ITEM_SUCCESS,
			useValue: PayerTableActions.GetCurrentItemSuccess,
		},
		{
			provide: GET_CURRENT_ITEM_ERROR,
			useValue: PayerTableActions.GetCurrentItemError,
		},
		{
			provide: CREATE_ITEM_TABLE_PENDING,
			useValue: PayerTableActions.CreatePayerIemTablePending,
		},
		{
			provide: CREATE_ITEM_TABLE_ERROR,
			useValue: PayerTableActions.CreatePayerIemTableError,
		},
		{
			provide: CREATE_ITEM_TABLE_SUCCESS,
			useValue: PayerTableActions.CreatePayerIemTableSuccess,
		},
		{
			provide: EDIT_ITEM_TABLE_PENDING,
			useValue: PayerTableActions.EditPayerIemTablePending,
		},
		{
			provide: EDIT_ITEM_TABLE_ERROR,
			useValue: PayerTableActions.EditPayerIemTableError,
		},
		{
			provide: EDIT_ITEM_TABLE_SUCCESS,
			useValue: PayerTableActions.EditPayerIemTableSuccess,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_PENDING,
			useValue: PayerTableActions.DublicatePayerIemTablePending,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_SUCCESS,
			useValue: PayerTableActions.DublicatePayerIemTableSuccess,
		},
		{
			provide: DUBLICATE_ITEM_TABLE_ERROR,
			useValue: PayerTableActions.DublicatePayerIemTableError,
		},
		{
			provide: CLEAR_CURRENT_ITEM,
			useValue: PayerTableActions.ClearCurrentPayer,
		},
		{
			provide: SAVE_GRID_SETTINGS_PENDING,
			useValue: PayerTableActions.SaveGridSettingsPending,
		},
		{
			provide: SAVE_GRID_SETTINGS_ERROR,
			useValue: PayerTableActions.SaveGridSettingsError,
		},
		{
			provide: SAVE_GRID_SETTINGS_SUCCESS,
			useValue: PayerTableActions.SaveGridSettingsSuccess,
		},
		{
			provide: SAVE_GRID_CHANGES_PENDING,
			useValue: PayerTableActions.SaveGridChnagesPending,
		},
		{
			provide: SAVE_GRID_CHANGES_ERROR,
			useValue: PayerTableActions.SaveGridChnagesError,
		},
		{
			provide: SAVE_GRID_CHANGES_SUCCESS,
			useValue: PayerTableActions.SaveGridChnagesSuccess,
		},
		{
			provide: GET_GRID_SETTINGS_PENDING,
			useValue: PayerTableActions.GetGridSettingsPending,
		},
		{
			provide: GET_GRID_SETTINGS_ERROR,
			useValue: PayerTableActions.GetGridSettingsError,
		},
		{
			provide: GET_GRID_SETTINGS_SUCCESS,
			useValue: PayerTableActions.GetGridSettingsSuccess,
		},
	],
})
export class PayerModule {}
