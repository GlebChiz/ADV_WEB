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
		StoreModule.forFeature('clinicianTable', clinicianReducers),
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
	],
})
export class ClinicianModule {}
