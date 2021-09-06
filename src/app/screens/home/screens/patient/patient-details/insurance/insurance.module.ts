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
import { InsurancePopupComponent } from './insurance-table/insurance-popup/insurance-popup.component';
import { InsuranceTableActions } from './insurance-table/insurance-table.actions';
import { InsuranceTableComponent } from './insurance-table/insurance-table.component';
import { InsuranceTableEffect } from './insurance-table/insurance-table.effects';
import { insuranceTableReducers } from './insurance-table/insurance-table.reducers';
import { InsuranceComponent } from './insurance.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: InsuranceComponent,
			},
		]),
		StoreModule.forFeature('insuranceTable', insuranceTableReducers),
		EffectsModule.forFeature([InsuranceTableEffect]),
	],
	declarations: [InsuranceComponent, InsuranceTableComponent, InsurancePopupComponent],
	entryComponents: [],
	providers: [
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
	],
})
export class InsuranceModule {}
